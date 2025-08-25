import express from 'express'; //library for setting up a server
import jwt, { decode } from 'jsonwebtoken'; //library to sign , verigy, & decode token
import cors from 'cors'; //library for handling cross-origin requests

const jwt_secret = "n3rddev"; //secret for signing the token

//@ts-ignore
function parseCookies(cookieHeader){
    const cookies ={}
    const cookiePair = cookieHeader.split(';');
    for(let pair of cookiePair){
        const [name, value] = pair.split('=');
        //@ts-ignore
        cookies[name.trim()] = value;
    }
    return cookies;
}

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.post('/signin',(req, res)=>{
    const {email, password} = req.body;
    //db validation code goes here
    const token = jwt.sign({ //signing a token with payload as email
        email
    }, jwt_secret);
    res.cookie("_secure_token", token)
    return res.json({cookie: token})
})

app.get('/user',(req, res)=>{
    const cookieHeader = req.headers['cookie'];
    const cookieObject = parseCookies(cookieHeader);
    //@ts-ignore
    const secureToken = cookieObject["_secure_token"];
    const decoded = jwt.verify(secureToken, jwt_secret);
    
    if(!decoded){
        return res.status(400).json({message:"Invalid token"});
    }
    //@ts-ignore
    res.status(200).json({message:"success", email: decoded.email})
})

app.post('/logout',(req, res)=>{
    res.cookie('_secure_token', "");
    return res.json({message:"logged out"})
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})