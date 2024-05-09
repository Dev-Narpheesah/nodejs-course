const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "git.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromises.unlink(path.join(__dirname, "files", "git.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\nNice to meet you!",
      "utf8"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    //    await fsPromises.parse(path.join(__dirname, "promiseComplete.txt"), "\ntext included")

    const Oyee = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    ); // to create a new variable
    console.log(Oyee);
  } catch (error) {
    console.error(error);
  }
};

fileOps();
