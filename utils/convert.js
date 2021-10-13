/*

    Usage: find ../doc/disting_help_4.17/help/ -name '*.txt' -type f | xargs node convert.js > ../src/data/help-texts.json

*/

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const json = {};

for (const filename of args) {
    const basename = path.basename(filename);
    const index = parseInt(basename.match(/\d+/)[0]);
    if (fs.statSync(filename).isDirectory()) {
        // console.log("skip directory", filename);
        continue;
    }
    const data = fs.readFileSync(filename, 'utf8');
    if (data === 'Hello') {
        continue;
    }
    json[index] = data.split("\n").filter(s => s);
}

console.log(JSON.stringify(json, null, 4));

// console.log(Object.keys(json).sort());
// const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
// console.log(Object.keys(sortObject(json)));
// console.log(JSON.stringify(sortObject(json), null, 4));
