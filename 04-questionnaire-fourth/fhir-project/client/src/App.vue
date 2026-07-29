<script setup>
import {ref , onMounted} from 'vue';                    //onMounted開啟瀏覽器就會去執行此動作
import BaseInput from './components/BaseInput.vue';     //引入template的內容

const questionnaire = ref (null); 
const answers = ref ({});
const targetId = ref('');
const loadQuestionnaire = async () => {                               //拿取資料的動作
const res = await fetch ('http://localhost:3000/questionnaire');      //從這個api拿取資料
const data = await res.json();                                        //json後存取到data中
  questionnaire.value=data;
  data.item.forEach(q=>{                                              //forEach跑完所有內容才停下來
    answers.value[q.linkId]=null;                                     //用linkId串起來，建立每個問題的答案
  });
};

const fetchQuestionnaire = async () => {
  if(!targetId.value) return;
  questionnaire.value=null;
  try{
    const res = await fetch (
      `http://localhost:3000/api/fhir/Questionnaire/${targetId.value}`
    );
    if(!res.ok)
    throw new Error("找不到此ID問卷");
    const data = await res.json();
    questionnaire.value = data;
    answers.value = {};
    if(data.item){
      data.item.forEach(q => {
        answers.value[q.linkId]=null;
      });
    }
  }catch(error){
    console.error("取得問卷發生錯誤");
  }
}

const generateFHIRResponse = () => {
  if (!questionnaire.value) return null ;

  return{
    resourceType : "QuestionnaireResponse",
    status : "completed",
    questionnaire : `Questionnaire/${questionnaire.value.id}`,
    item : questionnaire.value.item.map(q => {
      const userVal = answers.value[q.linkId];
      if(userVal===null || userVal===undefined || userVal===''){
        return{
          linkId : q.linkId,
          answers : []
        }
      }

      let answerData = {};

      if(q.type==="choice"){
        const selectedOption = q.answerOption.find(
          option => option.valueCoding.code===userVal
        );
        if(selectedOption){
          answerData={
            valueCoding : selectedOption.valueCoding
          };
        }
      }
      else if(q.type==="boolean"){
        answerData = {valueBoolean : userVal === "true" || userVal === true};
      }
      else if(q.type==="decimal" || q.type==="integer"){
        answerData = {valueDecimal : Number(userVal)};
      }
      else{
        answerData = {valueString : String(userVal)};
      }

      return {
        linkId : q.linkId,
        answer : [
          answerData
        ]
      };
    })
  };
}

const submitForm = async () => {
  const fhirPayload = generateFHIRResponse();
  try {
    const res = await fetch ("http://localhost:3000/api/fhir/QuestionnaireResponse" , {
      method : "POST",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify(fhirPayload)
    });

    const result = await res.json();

    if(!res.ok)
    throw new Error(result.error || "送出問卷失敗");

  }catch(error){
    console.error("送出問卷發生錯誤");
  }
};

//onMounted(loadQuestionnaire);                          //開啟瀏覽器就執行此問卷
</script>

<template>

  <div>
    <input v-model="targetId" placeholder="請輸入問卷ID">
    <button @click="fetchQuestionnaire"> 載入問卷 </button>
  </div>

  <div v-if="questionnaire">
    <h1> {{ questionnaire.title }} </h1>
    <form @submit.prevent="submitForm">                          <!--@submit.prevent不讓網頁刷新介面-->
      <BaseInput
        v-for = "item in questionnaire.item"
        :key = "item.linkId"
        :label = "item.text"
        :type = "item.type === 'decimal'?'number' : item.type"
        :options = "item.answerOption"
        v-model = "answers[item.linkId]">                           <!--傳送到子組件 modelValue = answer[item.linkId]-->
        <!--
        v-for，當item出現幾次就會回圈幾次直到所有跑完。
        key代表會連接到題目出現的linkId
        label代表item的text會出現題目的文字
        type出現decimal(因為HTML沒有decimal，FHIR才有的內容)時，轉換成number
        answerOption會出現在option中
        item.linked會存在answer中
        -->
      </BaseInput>
      <button type="submit"> 送出 </button>
    </form>
  </div>
</template>

<style scoped>

</style>
