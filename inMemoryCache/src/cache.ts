import mongoose from "mongoose";

export type Data ={
    userKey: mongoose.Types.ObjectId,
    elements: {
        name: string,
        age: number
    }
}

export default class Cache{

    data: Data[];
    private static instance: Cache;

    private constructor(){
        this.data = [];
    }

    static getInstance(){
        if(!Cache.instance){
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }

    public fillData(key: mongoose.Types.ObjectId, name: string, age: number): boolean {
        this.data.push({
            userKey: key,
            elements: { name, age }
        });
        return true;
    }

    public getData(key:mongoose.Types.ObjectId): Data | null{

        const found = this.data.find((d) => {
            return d.userKey.equals(key);
        });

        return found || null;
    }

}