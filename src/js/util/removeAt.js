export default function removeAt(array, findIndex) {
    const arr = new Array()
    array.forEach((item, index) => {
        if (index !== findIndex) arr.push(item);
    });
    return arr;
}