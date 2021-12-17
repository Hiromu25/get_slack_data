export const wait = async (ms: number) => {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
};