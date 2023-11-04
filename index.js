import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const port = 3000;
const app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

const API_URL = "https:api.blockchain.com/v3/exchange";
const apikey = " 32c38ec8-0d60-489f-b1e7-cf7b7d178d63";

 const config = {
    header: {
      Authorization : `Bearer${apikey}`
    },
 };

app.get("/", async (req,res)=> {
    try {
   const response = await axios.get(API_URL + "/tickers/BTC-USD",config);
   res.render("index.ejs", {data : response.data});
    } catch(error) {
        res.render("index.ejs",{data : error.message.data});
    }
});

app.post("/", async (req,res) => {
   const coinType = req.body.coin;
   try {
    const response = await axios.get(API_URL + "/tickers/" + coinType , config);
    res.render("index.ejs" , {data : response.data});
   } catch(error) {
    res.render("index.ejs" , {data : error.message.data});
   }
});

app.listen(port,()=> {
 console.log(`server running on the port ${port}`);
});


