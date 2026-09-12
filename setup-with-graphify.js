#!/usr/bin/env node

/**
 * AGY-CLI + Graphify Setup Script (Node.js)
 * Cross-platform setup for agy-cli and graphify
 * Works on: Windows, macOS, Linux
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const readline = require('readline');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Helper functions for colored output
const log = {
  success: (msg) => console.log(`${colors.green}[✓]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[✗]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[!]${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}[i]${colors.reset} ${msg}`),
};

// Function to check if command exists
function commandExists(cmd) {
  try {
    execSync(`${process.platform === 'win32' ? 'where' : 'which'} ${cmd}`, {
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
}

// Function to get command version
function getCommandVersion(cmd) {
  try {
    const version = execSync(`${cmd} --version`, { encoding: 'utf8' }).trim();
    return version;
  } catch {
    return 'unknown';
  }
}

// Function to execute shell command
function executeCommand(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const output = execSync(cmd, { encoding: 'utf8', ...options });
      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to ask user question
function question(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

// Main setup function
async function setup() {
  console.log('\n======================================');
  console.log('AGY-CLI + Graphify Setup (Node.js)');
  console.log('======================================\n');

  // Check prerequisites
  console.log('Checking prerequisites...\n');

  if (!commandExists('node')) {
    log.error('Node.js is not installed');
    console.log('Please install Node.js from https://nodejs.org/');
    process.exit(1);
  }
  log.success(`Node.js found: ${getCommandVersion('node')}`);

  if (!commandExists('npm')) {
    log.error('npm is not installed');
    process.exit(1);
  }
  log.success(`npm found: ${getCommandVersion('npm')}`);

  if (!commandExists('git')) {
    log.error('Git is not installed');
    console.log('Please install Git from https://git-scm.com/');
    process.exit(1);
  }
  log.success(`Git found: ${getCommandVersion('git')}\n`);

  // Install agy-cli dependencies
  console.log('======================================');
  console.log('Installing AGY-CLI');
  console.log('======================================\n');

  try {
    log.info('Installing agy-cli npm dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    log.success('agy-cli dependencies installed successfully\n');
  } catch (error) {
    log.error('Failed to install agy-cli dependencies');
    process.exit(1);
  }

  // Install graphify
  console.log('======================================');
  console.log('Installing Graphify');
  console.log('======================================\n');

  const graphifyDir = process.platform === 'win32' ? '..\\graphify' : '../graphify';

  if (fs.existsSync(graphifyDir)) {
    log.warning('Graphify directory already exists');
    const update = await question('Do you want to update it? (y/n): ');

    if (update === 'y') {
      try {
        log.info('Updating graphify...');
        const cwd = process.cwd();
        process.chdir(graphifyDir);
        execSync('git pull origin main', { stdio: 'inherit' });
        execSync('npm install', { stdio: 'inherit' });
        process.chdir(cwd);
        log.success('Graphify updated successfully\n');
      } catch (error) {
        log.error('Failed to update graphify');
        process.exit(1);
      }
    }
  } else {
    try {
      log.info('Cloning graphify repository...');
      execSync(
        `git clone https://github.com/VitrixLab-Philippines/graphify.git "${graphifyDir}"`,
        { stdio: 'inherit' }
      );
      log.success('Graphify cloned successfully');

      log.info('Installing graphify dependencies...');
      const cwd = process.cwd();
      process.chdir(graphifyDir);
      execSync('npm install', { stdio: 'inherit' });
      process.chdir(cwd);
      log.success('Graphify dependencies installed successfully\n');
    } catch (error) {
      log.error('Failed to clone or install graphify');
      process.exit(1);
    }
  }

  // Ask for global installation
  console.log('======================================');
  console.log('Global Installation');
  console.log('======================================\n');

  const answer = await question(
    'Do you want to install both tools globally? (y/n): '
  );

  if (answer === 'y') {
    try {
      log.info('Installing agy-cli globally...');
      const isWindows = process.platform === 'win32';
      const cmd = isWindows ? 'npm install -g .' : 'sudo npm install -g .';
      execSync(cmd, { stdio: 'inherit' });
      log.success('agy-cli installed globally');

      log.info('Installing graphify globally...');
      const cwd = process.cwd();
      process.chdir(graphifyDir);
      execSync(cmd, { stdio: 'inherit' });
      process.chdir(cwd);
      log.success('graphify installed globally\n');
    } catch (error) {
      log.error('Failed to install globally');
      process.exit(1);
    }
  } else {
    log.warning('Skipping global installation\n');
  }

  // Verify installation
  console.log('======================================');
  console.log('Verification');
  console.log('======================================\n');

  if (commandExists('agy-cli')) {
    const version = getCommandVersion('agy-cli');
    log.success(`agy-cli is available globally: ${version}`);
  } else {
    log.warning('agy-cli is not available globally');
  }

  if (commandExists('graphify')) {
    const version = getCommandVersion('graphify');
    log.success(`graphify is available globally: ${version}`);
  } else {
    log.warning('graphify is not available globally');
  }

  // Success message
  console.log('\n======================================');
  console.log('Setup Complete!');
  console.log('======================================\n');

  console.log('Next steps:');
  console.log('  1. Initialize a new project:');
  console.log('     agy-cli init\n');
  console.log('  2. Start the AGY CLI:');
  console.log('     agy-cli start\n');
  console.log('  3. In another terminal, start Graphify:');
  const graphifyPath =
    process.platform === 'win32' ? '..\\graphify' : '../graphify';
  console.log(`     cd ${graphifyPath}`);
  console.log('     graphify start\n');
  console.log('  4. View your data with Graphify visualization!\n');

  console.log('Useful commands:');
  console.log('  - agy-cli --help');
  console.log('  - graphify --help');
  console.log('  - agy-cli --with-graphify\n');

  console.log('Documentation:');
  console.log('  - AGY: https://github.com/VitrixLab-Philippines/agy');
  console.log(
    '  - Graphify: https://github.com/VitrixLab-Philippines/graphify\n'
  );
}

// Run setup
setup().catch((error) => {
  log.error('Setup failed');
  console.error(error);
  process.exit(1);
});
