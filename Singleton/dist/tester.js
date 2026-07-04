export class logger {
    static instance;
    count;
    constructor() {
        this.count = 0;
    }
    static getInstance() {
        if (!logger.instance) {
            logger.instance = new logger();
            return logger.instance;
        }
        return logger.instance;
    }
    getCount() {
        console.log(this.count);
    }
    addCount() {
        this.count++;
    }
}
//# sourceMappingURL=tester.js.map