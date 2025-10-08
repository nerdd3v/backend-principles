import { createClient } from "redis";
const client = createClient();
const processSubmission = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('process finished');
};
const starter = async () => {
    await client.connect();
    while (1) {
        const bin = await client.brPop('submission', 0);
        console.log(bin?.element);
    }
};
processSubmission().then(() => {
    starter();
});
//# sourceMappingURL=index.js.map