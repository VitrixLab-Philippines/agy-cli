#!/usr/bin/env python3

"""
AGY-CLI Setup Script (Python)
Cross-platform setup for agy-cli
Works on: Windows, macOS, Linux
Requires: Python 3.6+
"""

import subprocess
import sys
import os
import platform
from pathlib import Path

# Color codes for console output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

# Logger class
class Logger:
    @staticmethod
    def success(msg):
        print(f"{Colors.GREEN}[✓]{Colors.RESET} {msg}")

    @staticmethod
    def error(msg):
        print(f"{Colors.RED}[✗]{Colors.RESET} {msg}")

    @staticmethod
    def warning(msg):
        print(f"{Colors.YELLOW}[!]{Colors.RESET} {msg}")

    @staticmethod
    def info(msg):
        print(f"{Colors.BLUE}[i]{Colors.RESET} {msg}")

    @staticmethod
    def section(msg):
        print(f"\n{'='*40}")
        print(f"{Colors.BOLD}{msg}{Colors.RESET}")
        print(f"{'='*40}\n")

# System information
class SystemInfo:
    @staticmethod
    def get_os():
        return platform.system()

    @staticmethod
    def get_python_version():
        return f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"

    @staticmethod
    def command_exists(cmd):
        """Check if a command exists in the system PATH"""
        try:
            if SystemInfo.get_os() == 'Windows':
                subprocess.run(['where', cmd], capture_output=True, check=True)
            else:
                subprocess.run(['which', cmd], capture_output=True, check=True)
            return True
        except subprocess.CalledProcessError:
            return False

    @staticmethod
    def get_command_version(cmd):
        """Get version of a command"""
        try:
            result = subprocess.run([cmd, '--version'], capture_output=True, text=True)
            return result.stdout.strip()
        except Exception:
            return "unknown"

    @staticmethod
    def run_command(cmd, shell=True):
        """Execute a shell command"""
        try:
            result = subprocess.run(
                cmd,
                shell=shell,
                capture_output=False,
                text=True,
                check=True
            )
            return True, result
        except subprocess.CalledProcessError as e:
            return False, str(e)

# Setup class
class AGYCliSetup:
    def __init__(self):
        self.os_name = SystemInfo.get_os()
        self.is_windows = self.os_name == 'Windows'

    def check_prerequisites(self):
        """Check if all required tools are installed"""
        Logger.section("Checking Prerequisites")

        # Check Node.js
        if not SystemInfo.command_exists('node'):
            Logger.error("Node.js is not installed")
            print("Please install Node.js from https://nodejs.org/")
            sys.exit(1)
        node_version = SystemInfo.get_command_version('node')
        Logger.success(f"Node.js found: {node_version}")

        # Check npm
        if not SystemInfo.command_exists('npm'):
            Logger.error("npm is not installed")
            sys.exit(1)
        npm_version = SystemInfo.get_command_version('npm')
        Logger.success(f"npm found: {npm_version}")

        # Check Git
        if not SystemInfo.command_exists('git'):
            Logger.error("Git is not installed")
            print("Please install Git from https://git-scm.com/")
            sys.exit(1)
        git_version = SystemInfo.get_command_version('git')
        Logger.success(f"Git found: {git_version}")

        print()

    def install_dependencies(self):
        """Install npm dependencies"""
        Logger.section("Installing Dependencies")

        Logger.info("Installing npm dependencies...")
        success, result = SystemInfo.run_command('npm install')
        
        if success:
            Logger.success("Dependencies installed successfully\n")
        else:
            Logger.error("Failed to install dependencies")
            sys.exit(1)

    def ask_global_install(self):
        """Ask user if they want global installation"""
        Logger.section("Global Installation")

        response = input("Do you want to install agy-cli globally? (y/n): ").strip().lower()

        if response == 'y':
            Logger.info("Installing agy-cli globally...")
            if self.is_windows:
                cmd = 'npm install -g .'
            else:
                cmd = 'sudo npm install -g .'
            
            success, result = SystemInfo.run_command(cmd)
            
            if success:
                Logger.success("Global installation successful\n")
            else:
                Logger.error("Failed to install globally")
                sys.exit(1)
        else:
            Logger.warning("Skipping global installation\n")

    def verify_installation(self):
        """Verify that the installation was successful"""
        Logger.section("Verification")

        if SystemInfo.command_exists('agy-cli'):
            version = SystemInfo.get_command_version('agy-cli')
            Logger.success(f"agy-cli is available globally: {version}")
        else:
            Logger.warning("agy-cli is not available globally")
            Logger.info("But can be used with: npm run agy-cli\n")

    def show_success(self):
        """Show success message and next steps"""
        print("\n" + "="*40)
        print(f"{Colors.BOLD}Setup Complete!{Colors.RESET}")
        print("="*40 + "\n")

        print("Next steps:")
        print("  1. Run: agy-cli --help")
        print("  2. Initialize a project: agy-cli init")
        print("  3. Start using AGY CLI!\n")

        print("For setup with Graphify integration, run:")
        print("  python setup-with-graphify.py\n")

    def print_system_info(self):
        """Print system information"""
        Logger.section("System Information")

        print(f"Operating System: {self.os_name}")
        print(f"Python Version: {SystemInfo.get_python_version()}")
        print(f"Node.js: {SystemInfo.get_command_version('node')}")
        print(f"npm: {SystemInfo.get_command_version('npm')}")
        print()

    def run(self):
        """Run the complete setup"""
        print("\n" + "="*40)
        print(f"{Colors.BOLD}AGY-CLI Setup Script (Python){Colors.RESET}")
        print("="*40)

        self.print_system_info()
        self.check_prerequisites()
        self.install_dependencies()
        self.ask_global_install()
        self.verify_installation()
        self.show_success()

# Main entry point
if __name__ == '__main__':
    try:
        # Check Python version
        if sys.version_info < (3, 6):
            Logger.error("Python 3.6 or higher is required")
            print(f"You are running Python {sys.version_info.major}.{sys.version_info.minor}")
            sys.exit(1)

        # Run setup
        setup = AGYCliSetup()
        setup.run()

    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Setup cancelled by user{Colors.RESET}")
        sys.exit(0)
    except Exception as e:
        Logger.error("Setup failed")
        print(f"Error: {str(e)}")
        sys.exit(1)
