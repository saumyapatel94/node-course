const fs = require('fs');

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book);

// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const databuffer = fs.readFileSync('1-json.json').toString();
const data = JSON.parse(databuffer);
data.name = 'Saumya';
data.age = 21;
const dataJSON = JSON.stringify(data, null, 2);
fs.writeFileSync('1-json.json', dataJSON);