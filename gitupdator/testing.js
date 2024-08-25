const simpleGit = require("simple-git");
const { exec, spawn } = require("child_process");
const path = require("path");
var firstrun = true;
// Define the repository details
const repoURL = "https://jman13378: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@github.com/PBMHS-TSA/TSA-Software-2025.git";
const repoPath = path.join(__dirname, "TSA-Software-2025");
const backendPath = path.join(repoPath, "backend");
const git = simpleGit(repoPath);

let nodemonProcess = null;

// Function to set the remote URL with credentials
async function setRemoteUrl() {
  try {
    await git.removeRemote("origin");
    await git.addRemote("origin", repoURL);
  } catch (err) {
    console.error(`Error setting remote URL: ${err.message}`);
  }
}
simpleGit.default().push('origin', 'main')
// Function to pull from Git and run commands
async function updateRepo() {
  try {
    if (!firstrun) {
      console.log("Pulling the latest changes from Git...");

      // Ensure the remote URL with credentials is set
      await setRemoteUrl();

      // Pull the latest changes from the Git repository
      const pullResult = await git.pull("origin", "main");

      if (pullResult.summary.changes === 0 && pullResult.summary.insertions === 0 && pullResult.summary.deletions === 0) {
        console.log("Already Up to date...\nChecking in 30 Seconds");
        return;
      }

      firstrun = false;

      console.log("Pulled the latest changes.");
    }
    console.log("Starting Backend");
    // Change directory and run npm install
    exec(`npm i`, { cwd: backendPath }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running npm install: ${stderr}`);
        return;
      }

      console.log(stdout);

      // Restart nodemon process
      if (nodemonProcess) {
        console.log("Stopping existing nodemon process...");
        nodemonProcess.kill(); // Kill the existing nodemon process
      }

      console.log("Starting nodemon with the latest changes...");
      nodemonProcess = spawn("nodemon", ["index.ts"], { cwd: backendPath, stdio: "pipe" });

      nodemonProcess.on("close", (code,e) => {
        console.log(`Nodemon process exited with code ${code}`,e);
        nodemonProcess = null; // Reset the process reference
      });
    });
  } catch (err) {
    console.error(`Error during Git operation: ${err.message}`);
  }
}

// Set the interval to pull from Git every 30 seconds
setInterval(updateRepo, 30000);

// Initial pull and execution
updateRepo();
