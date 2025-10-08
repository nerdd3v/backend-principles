import express from 'express';
import { createClient } from 'redis';
import { isCallSignatureDeclaration } from 'typescript';

const app = express();
app.use(express.json())
const client = createClient()

client.on('error',()=>{
    console.error
})


app.post('/submit', async(req, res)=>{
    const {username, userId, code, language} = req.body;
    try {
        await client.lPush('submission', JSON.stringify({username, userId, code, language}))
        console.log("submisison added")
        return res.status(200).json({message: "submisison added"})
    } catch (error) {
        console.log(error)
    }
})

const startServer = async()=>{
    try {
        await client.connect()
        console.log('client connected')
        app.listen(3000, ()=>{
            console.log('listening on 3000')
        })
    } catch (error) {
        console.log(error)
    }    
}

startServer()

