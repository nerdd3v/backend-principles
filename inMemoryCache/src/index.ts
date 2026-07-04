import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import userModel from './db.js';
// import type { Data } from './cache.js';
import Cache from './cache.js';

const app = express();

app.use(express.json());

const cache =  Cache.getInstance();

app.post("/submit", async(req, res)=>{
    const {name, age } = req.body;

    const v = await userModel.create({
        name: name,
        age: age
    })

    return res.status(200).json({
        "message": "done the data sent",
        "key": v._id
    })
})

app.get("/get", async(req, res)=>{
    let {userId} = req.body;

    
    if(!userId){
        return res.status(400).json({
            "message": "user id not sent"
        })
    }

    userId = new mongoose.Types.ObjectId(userId);

    const inMemoryData = cache.getData(userId);

    if(inMemoryData){
        return res.status(200).json({
            message: "in memory data found",
            samaan: inMemoryData.elements
        })
    }

    const dbData = await userModel.findById(userId);

    if(!dbData){
        return res.status(400).json({
            message: 'data from neither found'
        })
    }

    if(dbData){
        cache.fillData(dbData._id, dbData.name!, dbData.age!)
        return res.status(200).json({
            message: "data from db",
            samaan: `${dbData.name} ${dbData.age}`
        })
    }


})

async function startServer(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/saket");
        app.listen(3000, ()=>{
            console.log("server listening on 3000")
        })
    } catch (error) {
        console.log("some error occured");
        process.exit(1)
    }
}

startServer();