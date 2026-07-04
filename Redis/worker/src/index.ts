import { createClient } from "redis";

const client = createClient();

const starter = async()=>{
    await client.connect();

    while(1){
        console.log("request received")
        const bin = await client.brPop('submission', 0);
        await new Promise((resolve)=>{
            setTimeout(resolve, 1000)
        })
        console.log(bin?.element)
    }
}

starter();