const simpleGit = require("simple-git");
const cron = require("node-cron");
const { exec, spawn } = require("child_process");
const os = require("os");

const repoPath = "./"; // Replace with the path to your repo
const git = simpleGit(repoPath);

const GIT_USERNAME = "jman13378"; // Replace with your Git username
const GIT_PASSWORD = "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"; // Replace with your Git password or PAT
const REPO_URL = "https://github.com/PBMHS-TSA/TSA-Software-2025.git"; // Replace with your repository URL

// Configure Git credentials
git.addConfig("user.name", GIT_USERNAME);
git.addConfig("user.password", GIT_PASSWORD);

let nodemonProcess = null;
function restartProcess() {
  console.log("Restarting the application...");

  // Kill the existing nodemon process if it's running
  if (nodemonProcess) {
    nodemonProcess.kill();
  }

  // Check the operating system
  const platform = os.platform();
  let command = "";

  if (platform === "win32") {
    // Windows: Open a new Command Prompt and run nodemon
    command = `start cmd.exe /k "cd ${repoPath + "/backend"} && npm i && nodemon index.ts"`;
  } else if (platform === "darwin") {
    // macOS: Open a new Terminal and run nodemon
    command = `osascript -e 'tell application "Terminal" to do script "cd ${repoPath + "/backend"} && sudo nodemon index.ts"'`;
  } else {
    // Linux: Open a new terminal (e.g., GNOME Terminal) and run nodemon
    command = `gnome-terminal -- bash -c "cd ${repoPath + "/backend"} && sudo nodemon index.ts; exec bash"`;
  }

  // Restart the application using nodemon in a new terminal
  nodemonProcess = spawn(command, { shell: true });
 
  nodemonProcess.on("error", (err) => {
    console.error(`Failed to start process: ${err}`);
  });

  nodemonProcess.on("close", (code) => {
    if (code !== null) {
      console.log(`nodemon process exited with code ${code}`);
      // Restart the process if it was closed
      restartProcess();
    }
  });
}
// Function to check for new commits and pull the latest changes
async function checkForUpdates() {
  try {
    await git.fetch(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);

    const status = await git.status();
    if (status.behind > 0) {
      console.log(`There are ${status.behind} new commits. Pulling changes...`);

      await git.pull(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);

      console.log("Changes pulled.");
      restartProcess();
    } else {
      if (nodemonProcess==null) {
        console.log("Starting process...");
        restartProcess();
      }else 
      console.log("No new commits.");
    }
  } catch (err) {
    console.error(`Error checking for updates: ${err}`);
  }
}

// Schedule the check to run every minute
cron.schedule("* * * * *", () => {
  console.log("Checking for updates...");
  checkForUpdates();
});
