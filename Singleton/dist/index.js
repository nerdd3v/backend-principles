import { logger } from "./tester.js";
function callLogger() {
    let c = logger.getInstance().count;
    console.log(c);
    logger.getInstance().addCount();
    logger.getInstance().getCount();
}
callLogger();
//# sourceMappingURL=index.js.map