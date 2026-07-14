import jsonParser from "./middleware/jsonParser.js";
import express from "express";

const app = express();
app.use(jsonParser)

app.post("/", (req, res)=>{
    const {name} = req.body;

    return res.status(200).json({
        name: `name is ${name}`
    })
})

app.listen(3000, ()=>{
    console.log("listening")
})