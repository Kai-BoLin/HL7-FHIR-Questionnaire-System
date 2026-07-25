//導入模組
const express= require('express');
const cors = require('cors');
const app = express();
//初始化實例並建立
const PORT = 3000;
//設定use中間鍵並啟用
app.use(cors());
app.use(express.json());

const fhirQuestionnaire = {
    resourceType : "Questionnaire",
    title : "每日健康回報",
    status : "active",
    item : [
        {
            linkId : "patient-name",
            text : "1.您的姓名",
            type : "string" 
        },{
            linkId : "body-temperature",
            text : "2.您的體溫",
            type : "decimal"
        },{
            linkId : "has-symptom",
            text : "3.您是否咳嗽",
            type : "boolean"
        },{
            linkId : "has-symptom2",
            text : "4.您的症狀",
            type : "choice",
            answerOption : [
                {
                    valueCoding : {
                    system : "http://snomed.info/sct",
                    code : "49727002",
                    display : "咳嗽"
                    }
                },{
                    valueCoding : {
                        system : "http://snomed.info/sct",
                        code : "386661006",
                        display : "發燒"
                    }
                },{
                    valueCoding : {
                        system : "http://snomed.info/sct",
                        code : "84387000",
                        display : "無以上症狀"
                    }
                }
            ]
        }
    ]
}

app.get("/questionnaire" , ( req , res ) =>{
    console.log("收到GET請求");
    res.json(fhirQuestionnaire);
});

app.listen(PORT,()=>{
    console.log("伺服器啟動成功");
})