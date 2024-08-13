const simpleGit = require("simple-git");
const { exec } = require("child_process");
const path = require("path");

// Define the repository details
const repoURL = "https://jman13378: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@github.com/PBMHS-TSA/TSA-Software-2025.git";
const repoPath = path.join(__dirname, "..");
const git = simpleGit(repoPath);

// Function to set the remote URL with credentials
async function setRemoteUrl() {
  try {
    await git.removeRemote('origin');
    await git.addRemote('origin', repoURL);
  } catch (err) {
    console.error(`Error setting remote URL: ${err.message}`);
  }
}


// Function to pull from Git and run commands
async function updateRepo() {
  try {
    console.log("Pulling the latest changes from Git...");

    // Ensure the remote URL with credentials is set
    await setRemoteUrl();

    // Pull the latest changes from the Git repository
    const pullResult = await git.pull("origin", "main");

    if (pullResult.summary.changes === 0 && pullResult.summary.insertions === 0 && pullResult.summary.deletions === 0) {
      console.log("Already Up to date...\nChecking in 30 Seconds");
      return;
    }

    console.log("Pulled the latest changes.");

    // Change directory and run npm install
    exec(`npm i`, { cwd: repoPath }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running npm install: ${stderr}`);
        return;
      }

      console.log(stdout);

      // Run nodemon
      exec(`nodemon index.ts`, { cwd: repoPath }, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error running nodemon: ${stderr}`);
          return;
        }

        console.log(stdout);
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
