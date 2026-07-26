//導入模組
const express= require('express');                   //啟用此套件
const cors = require('cors');                        //啟用此套件
const axios = require('axios');                      //啟用此套件
const app = express();                               //初始化實例並建立此套件

//全域變數設定
const FHIR_BASE_URL = "https://hapi.fhir.org/baseR4"
const PORT = 3000;
//設定use中間鍵並啟用
app.use(cors());
app.use(express.json());

//const fhirQuestionnaire = {
    // resourceType : "Questionnaire",
    // title : "每日健康回報",
    // status : "active",
    // item : [
    //     {
    //         linkId : "patient-name",
    //         text : "1.您的姓名",
    //         type : "string" 
    //     },{
    //         linkId : "body-temperature",
    //         text : "2.您的體溫",
    //         type : "decimal"
    //     },{
    //         linkId : "has-symptom",
    //         text : "3.您是否咳嗽",
    //         type : "boolean"
    //     },{
    //         linkId : "has-symptom2",
    //         text : "4.您的症狀",
    //         type : "choice",
    //         answerOption : [
    //             {
    //                 valueCoding : {
    //                 system : "http://snomed.info/sct",
    //                 code : "49727002",
    //                 display : "咳嗽"
    //                 }
    //             },{
    //                 valueCoding : {
    //                     system : "http://snomed.info/sct",
    //                     code : "386661006",
    //                     display : "發燒"
    //                 }
    //             },{
    //                 valueCoding: {
    //                     system: "http://snomed.info/sct",
    //                     code: "64531003",
    //                     display: "流鼻水"
    //                 }
    //             },{
    //                 valueCoding: {
    //                     system: "http://snomed.info/sct",
    //                     code: "62315008",
    //                     display: "腹瀉"
    //                 }
    //             },{
    //                 valueCoding : {
    //                     system : "http://snomed.info/sct",
    //                     code : "84387000",
    //                     display : "無以上症狀"
    //                 }
    //             }
    //         ]
    //     }
    // ]
//}

const fhirProxyHandler = async (req ,res) => {
    const {resource , id} = req.params;
    const url = id 
    ?`${FHIR_BASE_URL}/${resource}/${id}`           //有Id時走這串URL
    :`${FHIR_BASE_URL}/${resource}`                 //無Id時走這串URL

    console.log("正在查詢");

    try{
        const response = await axios.get (url , {
            params : req.query
        });
        res.json(response.data);
    }catch(error){
        if(error.response){
            res
            .status(error.response.status)
            .json(error.response.data)
        }else{
            res.status(530).json({
                error:"連線失敗"
            })
        }
    }
};

app.get("/api/fhir/:resource" , fhirProxyHandler);
app.get("/api/fhir/:resource/:id" , fhirProxyHandler);
app.post("/api/fhir/:resource" , async(req ,res) => {
    const {resource} = req.params;
    const fhirData = req.body;
    console.log("上傳中...");
    try {
        const response = await axios.post(
            `${FHIR_BASE_URL}/${resource}`,
            fhirData,
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
            }
        );
        console.log("上傳至FHIR server 成功!!" , response.data.id);
        res.json(response.data)
    } catch (error) {
        console.log("上傳失敗!!!");
    }
})

//app.get("/questionnaire" , ( req , res ) =>{
//    console.log("收到GET請求");
//    res.json(fhirQuestionnaire);
//});

app.listen(PORT,()=>{
    console.log("伺服器啟動成功");
})