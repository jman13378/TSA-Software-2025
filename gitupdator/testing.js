const simpleGit = require('simple-git');
const cron = require('node-cron');
const { exec } = require('child_process');

const repoPath = './../../repotesting/TSA-Software-2025'; // Replace with the path to your repo
const git = simpleGit(repoPath);

const GIT_USERNAME = 'jman13378'; // Replace with your Git username
const GIT_PASSWORD = 'garconiamail1'; // Replace with your Git password or PAT
const REPO_URL = 'https://github.com/PBMHS-TSA/TSA-Software-2025.git'; // Replace with your repository URL

// Configure Git credentials
git.addConfig('user.name', GIT_USERNAME);
git.addConfig('user.password', GIT_PASSWORD);

// Function to check for new commits and pull the latest changes
async function checkForUpdates() {
  try {
    await git.fetch(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);

    const status = await git.status();
    if (status.behind > 0) {
      console.log(`There are ${status.behind} new commits. Pulling changes...`);

      await git.pull(`https://${GIT_USERNAME}:${GIT_PASSWORD}@${REPO_URL}`);
      console.log('Changes pulled. Restarting the application...');

      // Restart the application using nodemon
      exec('sudo nodemon app.js', { cwd: repoPath }, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error restarting application: ${err}`);
          return;
        }
        console.log(stdout);
        console.error(stderr);
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