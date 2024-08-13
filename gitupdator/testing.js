const { exec } = require("child_process");
const path = require("path");

// Define the repository details
const repoURL = "https://jman13378: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@github.com/PBMHS-TSA/TSA-Software-2025.git";
const repoPath = path.join(__dirname, "root", "TSA-Software-2025");

// Function to pull from Git and run commands
function updateRepo() {
  console.log("Pulling the latest changes from Git...");

  // Command to pull from the Git repository
  exec(`git -C ${repoPath} pull ${repoURL}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error pulling from Git: ${stderr}`);
      return;
    }

    console.log(stdout);

    // Change directory and run npm install
    exec(`cd ${repoPath} && npm i`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running npm install: ${stderr}`);
        return;
      }

      console.log(stdout);

      // Run nodemon
      exec(`cd ${repoPath} && nodemon index.ts`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error running nodemon: ${stderr}`);
          return;
        }

        console.log(stdout);
      });
    });
  });
}

// Set the interval to pull from Git every 30 seconds
setInterval(updateRepo, 30000);

// Initial pull and execution
updateRepo();
