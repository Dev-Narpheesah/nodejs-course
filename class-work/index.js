const fsPromises = require("fs").promises;
const path = require("path");

const reset = async () => {
    try {
        const name = await fsPromises.readFile(
            path.join(__dirname, "media", "nafisat.txt"),
            "utf8"
          );
          console.log(name);

           await fsPromises.unlink(path.join(__dirname, "media", "nafisat.txt"));
           await fsPromises.writeFile(
            path.join(__dirname, "media", "ade.txt"),
            
          );
          await fsPromises.appendFile(
            path.join(__dirname, "media", "ade.txt"),
            "\nI'm a girl!",
            "utf8"
          );
          await fsPromises.rename(
            path.join(__dirname, "media", "ade.txt"),
            path.join(__dirname, "media", "adunni.txt")
          );

          const jeje = await fsPromises.readFile(
            path.join(__dirname, "media", "adunni.txt"),
            "utf8"
          );
          console.log(jeje);

          await fsPromises.unlink(path.join(__dirname, "files", "adunni.txt"));
        
    } catch (error) {
        console.log(error)
    }
   
}

reset()