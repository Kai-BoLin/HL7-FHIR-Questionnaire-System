const express = require('express'); //引入 express 套件
const cors = require('cors');       //引入 cors 套件
const app = express();              //實例化 Express 應用程式，建立一個伺服器物件，取名叫app

const PORT = 3000;                  //定義連線號碼

app.use(cors());                    //允許不同網址的前端來呼叫api
app.use(express.json());            //啟用解析json，伺服器傳來資料解析為json格式資料轉換成js物件

const fhirQuestionnaire = {         //宣告問卷變數
    resourceType : "Questionnaire",
    id : "",
    title : "每日健康狀況回報",
    status : "active",
    item : [
        {
            linkId : "patient-name",
            text : "1.您的姓名",
            type : "string"
        },
        {
            linkId : "patient-age",
            text : "2.您的年齡",
            type : "integer"
        },
        {
            linkId : "body-temperature",
            text : "3.您目前體溫",
            type : "decimal"
        },
        {
            "linkId": "blood-pressure-group",
            "text": "4. 您的血壓紀錄",
            "type": "group",
            "item" : [
                {
                    linkId : "bp-sys",
                    text : "收縮壓(mmHg)",
                    type : "integer"
                },
                {
                    linkId : "bp-dia",
                    text : "舒張壓(mmHg)",
                    type : "integer"
                },
            ]
        },
        {
            linkId : "has-symptoms",
            text : "5.您今日是否有以下症狀",
            type : "choice",
            answerOption : 
            [
                {
                    "valueCoding": {
                        "system": "http://snomed.info", // TW Core 標準：症狀類別引用 SNOMED CT 體系
                        "code": "49727002",
                        "display": "咳嗽"
                    }
                },{
                    "valueCoding": {
                        "system": "http://snomed.info",
                        "code": "386661006",
                        "display": "發燒"
                    }
                },{
                    "valueCoding": {
                        "system": "http://snomed.info",
                        "code": "25064002",
                        "display": "頭痛/肌肉痠痛"
                    }
                },{
                    "valueCoding": {
                        "system": "http://snomed.info",
                        "code": "267036007",
                        "display": "呼吸困難"
                    }
                },{
                    "valueCoding": {
                        "system": "http://snomed.info",
                        "code": "260413007", // 國際標準：代表「無上述特定症狀 (None)」
                        "display": "無以上症狀"
                    }
                }
            ]
        }
    ]
}


app.get("/questionnaire",(req,res) =>{  //設定GET路由
    console.log("收到GET請求");          //當有人造訪就會因出收到get請求
    res.json(fhirQuestionnaire);        //把問卷以json格式回傳給發送請求人
});

app.listen(PORT,() =>{
    console.log("伺服器啟動成功");
})