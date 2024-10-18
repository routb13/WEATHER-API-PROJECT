import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app=express();
const port=3000;
const API_URL = "https://api.openweathermap.org";
// const yourAPIKey = "166d446c0e00f27a4baf9e54f1eef4dc";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try{
        // collecting Delhi weather
        const responseDelhi=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:"Delhi",
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
            });
        // collecting Moscow weather
        const responseMoscow=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:"Moscow",
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
            });  
        // collecting London weather
        const responseLondon=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:"London",
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
        });  
        // collecting Tokyo weather
        const responseTokyo=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:"Tokyo",
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
        });  
         // collecting New York weather
         const responseNY=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:"New York",
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
            });
            // collecting New York weather
         const responseBeijing=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:"Beijing",
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
            });
            //console.log(responseDelhi);  
            const commonCities={
                delhi:responseDelhi.data,
                moscow:responseMoscow.data,
                london:responseLondon.data,
                tokyo:responseTokyo.data,
                ny:responseNY.data,
                beijing:responseBeijing.data,
            }
            res.render("index.ejs",{commonCities})
        /* res.render("index.ejs",{
            delhiWeather:responseDelhi.data,moscowWeather:responseMoscow.data,
            londonWeather:responseLondon.data,tokyoWeather:responseTokyo.data,
            nyWeather:responseNY.data,beijingWeather:responseBeijing.data,
         }); */
    }catch(error){
        res.status(404).send(error.message);
    }
});
app.get("/home",(req,res)=>{
    res.redirect("/");
}); 
app.get("/about",(req,res)=>{
    res.render("about.ejs");
});
app.get("/usage",(req,res)=>{
    res.render("usage.ejs");
});
app.post("/submit",async(req,res)=>{
     const cityName=req.body["city"];
    // console.log(cityName);
    try{
        const response=await axios.get(API_URL+"/data/2.5/weather?",{
            params:{
                q:cityName,
                appid:"166d446c0e00f27a4baf9e54f1eef4dc",
            }
            }); 
        //console.log(response);  
        const result=response.data;
        console.log(result);  
        res.render("index.ejs",{cityWeather:result});
        
        // res.redirect("/");
    }catch(error){
        res.status(404).send(error.message);
    }
}); 
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});