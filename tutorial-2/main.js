const fs = require("fs");
const path = require("path");

// fs.readFile("./files/open.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readFile(path.join(__dirname, "files", "open.txt"), "utf8", (err, data) => {
//   if (err) throw err;21
//   console.log(data);
// });

// fs.writeFile(
//   path.join(__dirname, "files", "late.txt"),
//   "Omo we are always late during Team lead's class", 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('data');
//   }
// );

// fs.appendFile(
//   path.join(__dirname, "files", "late.txt"),
//   "\n\nGuys remain async put your mind at rest", 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('follow follow');
//   }
// );

// fs.appendFile(
//   path.join(__dirname, "files", "open.txt"),
//   "\n\n\n\nClosing period please",
//   (err, data) => {
//     if (err) throw err;
//     console.log("append text");
//   }
// );

// fs.rename(
//   path.join(__dirname, "files", "open.txt"),
//   (__dirname, "files", "git.txt"),
//   (err, data) => {
//     if (err) throw err;
//     console.log("name change");
//   }
// );


fs.writeFile("server.js", `const fsPromise = require("fs").promises`, "utf8", (err) => {
  if(err) throw err;
  console.log("file created");

  fs.appendFile("server.js", `\nconst path = require("path")`, "utf8", (err) => {
      if(err) throw err;
      console.log("Content added");
  })
})
console.log("Zainab");

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error :${err}`);
  process.exit();
});


