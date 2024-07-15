const simpleGit = require('simple-git');
const cron = require('node-cron');
const { exec,spawn } = require('child_process');
const os = require('os');

const repoPath = './../../repotesting/TSA-Software-2025'; // Replace with the path to your repo
const git = simpleGit(repoPath);

const GIT_USERNAME = 'jman13378'; // Replace with your Git username
const GIT_PASSWORD = 'garconiamail1'; // Replace with your Git password or PAT
const REPO_URL = 'https://github.com/PBMHS-TSA/TSA-Software-2025.git'; // Replace with your repository URL

// Configure Git credentials
git.addConfig('user.name', GIT_USERNAME);
git.addConfig('user.password', GIT_PASSWORD);

let nodemonProcess = null;

// Function to check for new commits and pull the latest changes
async function checkForUpdates() {
  try {
    await git.fetch(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);

    const status = await git.status();
    if (status.behind > 0) {
      console.log(`There are ${status.behind} new commits. Pulling changes...`);

      await git.pull(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);
      console.log('Changes pulled. Restarting the application...');

      // Kill the existing nodemon process if it's running
      if (nodemonProcess) {
        nodemonProcess.kill();
      }

      // Check the operating system
      const platform = os.platform();
      let command = '';

      if (platform === 'win32') {
        command = 'nodemon app.js'; // Windows doesn't need 'sudo'
      } else {
        command = 'sudo nodemon app.js'; // Linux or macOS
      }

      // Restart the application using nodemon
      nodemonProcess = spawn(command, { cwd: repoPath, shell: true });

      nodemonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      nodemonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      nodemonProcess.on('close', (code) => {
        console.log(`nodemon process exited with code ${code}`);
      });

    } else {
      console.log('No new commits.');
    }
  } catch (err) {
    console.error(`Error checking for updates: ${err}`);
  }
}

// Schedule the check to run every minute
cron.schedule('* * * * *', () => {
  console.log('Checking for updates...');
  checkForUpdates();
});