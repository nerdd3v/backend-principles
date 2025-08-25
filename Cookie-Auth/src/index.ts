import express from 'express'; //library for setting up a server
import jwt from 'jsonwebtoken'; //library to sign , verigy, & decode token
import cors from 'cors'; //library for handling cross-origin requests

const jwt_secret = "n3rddev"; //secret for signing the token

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.post('signin',(req, res)=>{
    const {email, password} = req.body;
    //db validation code goes here
    const token = jwt.sign({ //signing a token with payload as email
        email
    }, jwt_secret);
    res.cookie("_secure_token", token)
})

app.get('/user',(req, res)=>{
    
})