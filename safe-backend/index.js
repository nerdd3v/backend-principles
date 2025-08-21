const express = require('express');

const app = express();
app.use(express.json());

const emails = [];
const otps = []; //[{email: email, otp: generateOTP()}]

const generateOTP = ()=>{
    return Math.floor(Math.random()*9000);
}

const rateLimitStore = {}; //email:{otp, count};
const maxAttemp = 3;
const WINDOW_MS = 60*60*1000;

const checkLimit = (email)=>{
    const now = Date.now();
    if(!rateLimitStore[email]){
        rateLimitStore[email] = { count:1, firstRequest:now };
        return false;
    }
    const { count, firstRequest } = rateLimitStore[email];
    if(now - firstRequest < WINDOW_MS){
        if(count >= maxAttemp){
            return true;
        }
        rateLimitStore[email].count += 1;
        return false; 
    }else{
        //reset window
        rateLimitStore[email] = {count:1, firstRequest: now};
        return false;
    }
}

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (emails.includes(email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  emails.push(email);
  res.status(201).json({ message: "Signup successful" });
});


app.post('/change',(req, res)=>{
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({message: "Email not provided", success: false});
    }

    //check email in the email array that is pretending to be a database;
    const emailExists = emails.includes(email);
    if(!emailExists){
        return res.status(404).json({message:"Invalid email", success: false})
    }
    const otp = generateOTP();
    otps.push({email, otp});
    console.log(otp)
    return res.status(200).json({message:"OTP generated", success:true})
})

app.post('/otp',(req, res)=>{
    const { email, otp } = req.body;
    if(!email || !otp){
        return res.status(404).json({message:"Email or OTP not provided"});
    }
    const emailExists = emails.includes(email);
    if(!emailExists){
        return res.status(400).json({message:"Invalid Email"});
    }
    if(checkLimit(email)){
        return res.status(404).json({message:"Too many requests"})
    }
    const validOTP = otps.find(i=> i.email==email && i.otp == otp);
    if(!validOTP) {
        return res.status(404).json({message:"Invalid OTP"})
    }
    return res.status(200).json({message:"Valid OTP "})

})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})