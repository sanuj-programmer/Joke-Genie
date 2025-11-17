import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const api_url = "https://v2.jokeapi.dev/joke/";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


app.get("/", async (req,res) => {
    try{
        const response = await axios.get(api_url+"Any?type=single");
        res.render("index.ejs",{joke:JSON.stringify(response.data.joke)});
    }
    catch(error){
        console.log(error);
        res.render("index.ejs",{joke: JSON.stringify(error)});
    }
});

app.post("/", async (req,res) => {
    try{
        const type = req.body.type;
        const category = req.body.category;

        console.log(type);
        console.log(category);

        const url = api_url+`${category}?type=${type}`;

        console.log(url);

        const response = await axios.get(url);

        const joke = response.data.joke;
        const first = response.data.setup;
        const second = response.data.delivery;

        res.render("index.ejs",{
            joke: JSON.stringify(joke),
            first: JSON.stringify(first),
            second: JSON.stringify(second),
        });
            
    }
    catch(error){
        console.log(error);
        res.render("index.ejs",{joke: JSON.stringify(error)});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});