// const src = require('./algorithms.json')
// console.log(src);

// const fs = require('fs');
// const path = require('path');
// const args = process.argv.slice(2);

const source = process.argv[2];
if (!source) {
    console.error("Usage: node json2json.js ./source.json")
    return;
}

const src = require(source);

const json = {};

for (const algo of src) {
    // console.log(algo["name"]);

    let ioA = "";
    let ioB = "";
    let ioX = "";
    let ioY = "";
    let ioZ = "";
    let btZ = "";
    for (let io of algo["io"]) {
        if (io.toUpperCase().startsWith("A")) {
            // if (io.includes("=")) {
            //     ioA = io.split("=")[1].trim();
            // } else if (io.includes(" is ")) {
            //     ioA = io.split(" is ")[1].trim();
            // } else {
            ioA = io;
            // }
        } else if (io.toUpperCase().startsWith("B")) {
            ioB = io;
        } else if (io.toUpperCase().startsWith("X")) {
            ioX = io;
        } else if (io.toUpperCase().startsWith("Y")) {
            ioY = io;
        } else if (io.toUpperCase().startsWith("Z")) {
            ioZ = io;
        } else if (io.toUpperCase().includes("Z")) {
            ioZ = io;
        }
    }
    let params = [];
    for (let p of algo["parameters"]) {
        params.push(
            {
                "name": p[3],
                "min": p[0],
                "max": p[1],
                "def": p[2],
                "unit": "",
                "control": "knob"
            }
        );
    }
    const id = algo["algorithm"].replace("-", "");
    json[id] = {
        "name": algo["name"],
        "category": algo["category"],
        "Z-button": btZ,
        "Z": ioZ,
        "X": ioX,
        "Y": ioY,
        "A": ioA,
        "B": ioB,
        "midi" : {
            "in": algo["extra"] ? algo["extra"].toUpperCase().includes("RECEIVES MIDI") : false,
            "out": false
        },
        "parameters": params
    };
}

console.log(JSON.stringify(json, null, 4));

/*
const json = {};
const data = fs.readFileSync(args[0], 'utf8');
console.log(data);
*/
