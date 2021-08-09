console.log("Helo Promise");
//new Promise(function(resolve,reject))
//1
/*
let pr = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (1 < 2)
            resolve("da doi xong");
        else
            reject(new Error("co loi"));
    }, 2000);
});
pr.then(resolveHandle, rejecthandle);

function resolveHandle(data) {
    console.log(data);
}
function rejecthandle(err) {
    console.log(err);
}
*/
//2


var fs = require("fs");
let readFile = (filename) => {
    let pr = new Promise((resolve, reject) => {

        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data)
            }
        });
    });
    return pr;
}
let writeFile = (filename, data, add) => {
    let pr = new Promise((resolve, reject) => {
        data += " " + add;
        fs.writeFile(filename, data, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data)
            }
        });
    });
    return pr;
}
/*
readFile("./data/sample.txt").then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})
*/
/*
let = (filename) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log("err: " + err)
        }
        else {
            data += " 1";
            fs.writeFile(filename, data, (err) => {
                if (err) {
                    console.log("err: " + err);
                }
            });
        }
    });
}
*/
// ex
let filename = "./data/sample.txt";
readFile(filename)
    .then((data) => writeFile(filename, data, " new "))
    .then(data => console.log("end : " + data))
    .catch(err => { throw err })
// asyn /wait


let pr = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (1 < 2)
            resolve("da doi xong");
        else
            reject(new Error("co loi"));
    }, 2000);
});

let waitTime = async () => {
    console.log(" start ");
    let res = await pr;
    console.log(res);
}
waitTime();