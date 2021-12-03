
export const sortData = (array:any[],key:string) => {
    array.sort((a,b) => b[key] - a[key]);
    return array
}