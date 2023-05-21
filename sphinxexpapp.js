const express = require('express');
const parser = require('body-parser');
const path = require('path');
const sph = require('./sphinx');

// const fileting = require('express-fileupload')

const mainport = 80;
const main = express();

// main.use(fileting({createParentPath:true}));
main.use(express.json());
main.use(parser.urlencoded({extended : true}));
// main.use(express.static(path.join(__dirname, 'statics')));
// main.use(express.static(path.join(__dirname, 'webapp', 'build')));

sph.register("bruh", 'moment', 'epic', 'chungus')






// main.listen(mainport, () => {
//     console.log(`Sphinx API started on port ${mainport}\nAvailable endpoints:\n-> /\n-> /auth`);
// });