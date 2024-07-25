const simpleGit = require("simple-git");
const cron = require("node-cron");
const { exec } = require("child_process");
const os = require("os");

const repoPath = "~/TSA-Software-2025"; // Replace with the path to your repo
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

  // Construct the command to execute based on the platform
  const platform = os.platform();
  let command = `cd ${repoPath + "/mobile/myApp"} && npm install && npm run dev`;

  // For Windows, prepend 'cmd /c' to the command
  if (platform === "win32") {
    command = `cmd /c "${command}"`;
  } else {
    // For Unix-like systems (macOS, Linux), use bash to run the command
    command = `bash -c "${command}"`;
  }

  // Restart the application using nodemon
  nodemonProcess = exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Failed to start process: ${err}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });

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
  console.log("Checking for updates...");
  try {
    await git.fetch(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);

    const status = await git.status();
    console.log("Fetch Successful!");

    if (status.behind > 0) {
      console.log(`There are ${status.behind} new commits. Pulling changes...`);

      await git.pull(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);

      console.log("Changes pulled.");
      restartProcess();
    } else {
      if (nodemonProcess == null) {
        console.log("Starting process...");
        restartProcess();
      } else {
        console.log("No new commits.");
      }
    }
  } catch (err) {
    console.error(`Error checking for updates: ${err}`);
  }
}

// Schedule the check to run every minute
cron.schedule("* * * * *", () => {
  checkForUpdates();
});
