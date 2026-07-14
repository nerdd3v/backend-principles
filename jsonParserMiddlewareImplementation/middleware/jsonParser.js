export default function jsonParser  (req, res, next){
    
    if(req.headers['content-type'] !== "application/json"){
        return next();
    }

    let rawData = "";

    let sendData;
    req.on("data", (chunk)=>{
        rawData += chunk.toString();
    })

    req.on("end", ()=>{
        if(rawData){
            req.body = JSON.parse(rawData);
        }
        else{
            req.body = {}
        }
        next();
    })

    req.on("error", (err)=>{
        return res.status(400).json({
            message: "error in parsing json"
        })
    })
}