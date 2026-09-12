#!/usr/bin/env node

/**
 * AGY-CLI Setup Script (Node.js)
 * Cross-platform setup for agy-cli
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
  console.log('AGY-CLI Setup Script (Node.js)');
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

  // Install dependencies
  console.log('======================================');
  console.log('Installing Dependencies');
  console.log('======================================\n');

  try {
    log.info('Installing npm dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    log.success('Dependencies installed successfully\n');
  } catch (error) {
    log.error('Failed to install dependencies');
    process.exit(1);
  }

  // Ask for global installation
  console.log('======================================');
  console.log('Global Installation');
  console.log('======================================\n');

  const answer = await question(
    'Do you want to install agy-cli globally? (y/n): '
  );

  if (answer === 'y') {
    try {
      log.info('Installing agy-cli globally...');
      const isWindows = process.platform === 'win32';
      const cmd = isWindows ? 'npm install -g .' : 'sudo npm install -g .';
      execSync(cmd, { stdio: 'inherit' });
      log.success('Global installation successful\n');
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
    log.info('But can be used with: npm run agy-cli\n');
  }

  // Success message
  console.log('\n======================================');
  console.log('Setup Complete!');
  console.log('======================================\n');

  console.log('Next steps:');
  console.log('  1. Run: agy-cli --help');
  console.log('  2. Initialize a project: agy-cli init');
  console.log('  3. Start using AGY CLI!\n');

  console.log('For setup with Graphify integration, run:');
  console.log('  node setup-with-graphify.js\n');
}

// Run setup
setup().catch((error) => {
  log.error('Setup failed');
  console.error(error);
  process.exit(1);
});
