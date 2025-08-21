const express = require('express');
const app = express();

app.use(express.json());

const emails = [];
const otpArr = [];


function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); // ensures 4-digit
}

const RateLimitStore = {};
const RATE_LIMIT = 3;
const WINDOW_MS = 60*60*1000; 

const rateLimiting = (email) => {
  const now = new Date();

  if (!RateLimitStore[email]) {
    RateLimitStore[email] = { count: 1, firstRequest: now };
    return false; // not exceeding rate limit
  }

  const { count, firstRequest } = RateLimitStore[email];

  if (now - firstRequest < WINDOW_MS) {
    if (count >= RATE_LIMIT) {
      return true; // rate limit exceeded
    }
    RateLimitStore[email].count += 1;
    return false;
  } else {
    // Reset after window
    RateLimitStore[email] = { count: 1, firstRequest: now };
    return false;
  }
};

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

app.post('/change', (req,res)=>{
    const {email} = req.body;
    const exists = emails.includes(email)

    if(exists){
        const otp = generateOTP();
        otpArr.push({email, otp})
        console.log("otp sent"+ otp);
        res.status(200).json({message:"otp sent!"})
    }else{
        res.status(400).json({message:"Email not found"});
    }
})

app.post('/otp',(req, res)=>{
    const {email, otp} = req.body;
    
    if(rateLimiting(email)){
      console.log("rate limit exceeded");
      return res.status(429).json({message:"Too many otp attempts. Please try again later"})
    }

    if(!otp || !email){
        return res.status(404).json({message:"otp and email are required"})
    }
    const index = otpArr.findIndex(entry=> entry.email === email && entry.otp === Number(otp));
    if(index === -1){
        return res.status(404).json({message:'invalid otp or email'});
        
    }
    console.log("password changed")
    return res.status(200).json({message:"verified successfuly"})
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})