export const promiseConcurrent = async (promiseList:any[],concurrent:number) => {
    let length = promiseList.length
    let times = Math.ceil(length / concurrent)
    for (let i=0;i<times;i++) {
        if ((i+1)*concurrent < length){
            console.log("*****************   " + i*concurrent + " ~ " + (i+1)*concurrent + "   **************")
            let tmpPromise = promiseList.slice(i*concurrent,(i+1)*concurrent)
            await Promise.all(tmpPromise)
            console.log("-----------------   " + i*concurrent + " ~ " + (i+1)*concurrent + "   --------------")
        } else {
            console.log("*****************   " + i*concurrent + " ~ " + (length-1) + "   **************")
            let tmpPromise = promiseList.slice(i*concurrent,length-1)
            await Promise.all(tmpPromise)
            console.log("-----------------   "+ i*concurrent + " ~ " + (length-1) + "   --------------")
        }
    }
}

export async function runConcurrentlyAsync(iterable:any[], concurrency:number) {
    const iterator = iterable[Symbol.iterator]();
    let index = 0; // ログ用
    const promises = Array.from({ length: concurrency }, (_, id) => {
        return new Promise(async (resolve) => {
            for (
                let result = iterator.next();
                !result.done;
                result = iterator.next()
            ) {
                const i = index++;
                console.log(`${id}: ${i}...`);

                await result.value();

                console.log(`        ...${id}: ${i}`);
            }

            resolve(undefined);
        });
    });
    await Promise.all(promises);
}