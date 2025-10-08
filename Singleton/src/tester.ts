
export class logger{
    private static instance: logger;
    public count: number
    private constructor(){
        this.count = 0;
    }

    public static getInstance(){
        if(!logger.instance){
            logger.instance = new logger()
            return logger.instance
        }
        return logger.instance
    }
    public getCount (){
        console.log(this.count)
    }
    public addCount(){
        this.count++;
    }
}

//just make the constructor private and the getInstance static so that we can get the instance from any given file