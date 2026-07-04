import os from 'os';
import cluster from 'cluster';
import express from 'express';

const totalCPU = os.cpus().length;

const port = 3000;

if(cluster.isPrimary){
    console.log('Total number of CPU '+ totalCPU );
    for(let i = 0; i< totalCPU; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker)=>{
        console.log(worker.process.pid + " is dead");
        cluster.fork();
    })
}else{
    console.log(process.pid)
    const app = express();
    app.get('/',(req, res)=>{
        res.json({message:"hello"})
    })

    app.get('/count/:n', (req, res)=>{
        let n = parseInt(req.params.n);
        let count = 0;

        for(let i = 0; i< n; i++){
            count += i;
        }
        res.json({count, pid: process.pid})
    })
    app.listen(port, ()=>{
        console.log('listenin on port 3000')
    })
}