const express = require('express');

const app = express();
app.use(express.json());

let messages = [];

app.get('/poll',(req, res)=>{
    const polling = ()=>{
        if(messages.length > 0){
            const newMessages = [...messages];
            messages = [];
            res.json(newMessages);
        }else{
            setTimeout(polling, 1000);
        }
    };
    polling();
})

app.post('/send',(req, res)=>{
    const {message} = req.body;
    messages.push(message);
      res.send({ status: 'Message received' });
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})