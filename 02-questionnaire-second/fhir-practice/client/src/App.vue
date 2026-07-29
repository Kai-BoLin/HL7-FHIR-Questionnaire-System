<script setup>
    import { ref , onMounted} from 'vue' ;                 //onMounted開啟瀏覽器就會去執行此動作
    import BaseInput from './components/BaseInput.vue';

    const questionnaire = ref(null);
    const answers = ref({});
    const loadQuestionnaire = async () => {
      const res = await fetch('http://localhost:3000/questionnaire');
      const data = await res.json();
      questionnaire.value = data ;
      data.item.forEach(q =>{
        answers.value[q.linkId] = null ;
      });
    };
      //forEach跑完之後會長以下這樣(會將item的選項都執行完畢)
      // answers.value={
      // patient-name:null, 
      // body-temperature:null,
      // has-symptom:null,
      // has-symptom2:null
      // }

    onMounted(loadQuestionnaire);

</script>

<template>
    <div v-if="questionnaire">
      <h1> {{ questionnaire.title }}</h1>
      <!--不讓網頁重新動作(刷新頁面)-->
      <form @submit.prevent="onSubmitForm">
        <BaseInput 
        v-for = "item in questionnaire.item"
        :key = "item.linkId"
        :label = "item.text"
        :type = "item.type === 'decimal'?'number': item.type "    
        :options = "item.answerOption"
        v-model="answers[item.linkId]" />
        <button type="submit">送出</button>
      </form>
    </div>
</template>

<style scoped>

</style>
