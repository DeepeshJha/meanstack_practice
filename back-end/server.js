// // const http = require('http');
// // const app = require("./app")

// // // const server = http.createServer((req, res) => {
// // //     res.end("First Response")
// // // })

// // const port = process.env.PORT || 3000;
// // app.set("port",port)
// // const server = http.createServer(app);
// // server.listen(port)

//                                             /* ******** Update Code ********* */

// const app = require("./app");
// const debug = require("debug")("node-angular");
// const http = require("http");

// const normalizePort = val => {
//   var port = parseInt(val, 10);
//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }
//   if (port >= 0) {
//     // port number
//     return port;
//   }
//   return false;
// };

// const onError = error => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   const bind = typeof port === "string" ? "pipe " + port : "port " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// const onListening = () => {
//   const addr = server.address();
//   const bind = typeof port === "string" ? "pipe " + port : "port " + port;
//   debug("Listening on " + bind);
// };

// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);

// const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
// server.listen(port);

const fs = require("fs")

// Should return a list of events
async function getLogs() {
    const content = await fs.readFileSync("./logs.txt", 'utf8').split('\r\n');
    let Content = [];
    content.forEach(line => {
        line = line.split('\t');
        lineObj = {
            date: new Date(line[0]),
            code: line[2],
            userId: line[4]
        };
        getData(line).then(data => {line.userName = data})
        Content.push(line);
    });
    console.log("---",Content)
    return Content;
}

function getData(id) {
    return new Promise((resolve, reject) => {
      resolve({
        "366": "Jack",
        "132": "Joe",
        "390": "James",
      });
      
    });
  }

getLogs();
