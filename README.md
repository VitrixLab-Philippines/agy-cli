# agy-cli

CLI integration for AGY - for training people

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Setup with Graphify](#setup-with-graphify)
- [Usage](#usage)
- [Requirements](#requirements)
- [Training Resources](#training-resources)

## 📦 Installation

### Windows (CMD)

#### Option 1: Using Batch Script (Recommended for Beginners)

1. **Download and Navigate**
   ```cmd
   git clone https://github.com/VitrixLab-Philippines/agy-cli.git
   cd agy-cli
   ```

2. **Run the Batch File**
   ```cmd
   setup.bat
   ```

   The script will automatically:
   - Check for Node.js, npm, and Git
   - Install dependencies
   - Offer to install globally
   - Verify the installation

3. **What the Batch Script Does**
   - ✅ Validates all prerequisites
   - ✅ Runs `npm install`
   - ✅ Optionally installs globally with `npm install -g .`
   - ✅ Verifies successful installation
   - ✅ Provides next steps

#### Option 2: Using Node.js Script

1. **Navigate to Project**
   ```cmd
   cd agy-cli
   ```

2. **Run Node.js Setup Script**
   ```cmd
   node setup.js
   ```

   **What the Node script does:**
   - ✅ Cross-platform compatibility (Windows, macOS, Linux)
   - ✅ Checks Node.js, npm, and Git versions
   - ✅ Installs npm dependencies
   - ✅ Handles errors gracefully
   - ✅ Colorful console output for better readability
   - ✅ Can be integrated into other Node.js projects

#### Option 3: Using Python Script

1. **Navigate to Project**
   ```cmd
   cd agy-cli
   ```

2. **Run Python Setup Script**
   ```cmd
   python setup.py
   ```

   **What the Python script does:**
   - ✅ Cross-platform compatibility
   - ✅ Detailed system information reporting
   - ✅ Environment variable checking
   - ✅ Detailed error messages
   - ✅ Easy to understand for learning purposes
   - ✅ Can run on any system with Python installed

#### Option 4: Manual Installation

1. **Prerequisites Check**
   ```cmd
   node --version
   npm --version
   git --version
   ```

2. **Clone the Repository**
   ```cmd
   git clone https://github.com/VitrixLab-Philippines/agy-cli.git
   cd agy-cli
   ```

3. **Install Dependencies**
   ```cmd
   npm install
   ```

4. **Install Globally (Optional)**
   ```cmd
   npm install -g .
   ```

5. **Verify Installation**
   ```cmd
   agy-cli --version
   ```

### macOS/Linux (Bash)

#### Option 1: Using Bash Script (Recommended for Beginners)

1. **Download and Navigate**
   ```bash
   git clone https://github.com/VitrixLab-Philippines/agy-cli.git
   cd agy-cli
   ```

2. **Run the Bash Script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   The script will automatically:
   - Check for Node.js, npm, and Git
   - Install dependencies
   - Offer to install globally
   - Verify the installation

3. **What the Bash Script Does**
   - ✅ Validates all prerequisites
   - ✅ Runs `npm install`
   - ✅ Optionally installs globally with `sudo npm install -g .`
   - ✅ Verifies successful installation
   - ✅ Color-coded output for clarity

#### Option 2: Using Node.js Script

1. **Navigate to Project**
   ```bash
   cd agy-cli
   ```

2. **Run Node.js Setup Script**
   ```bash
   node setup.js
   ```

#### Option 3: Using Python Script

1. **Navigate to Project**
   ```bash
   cd agy-cli
   ```

2. **Run Python Setup Script**
   ```bash
   python3 setup.py
   ```

#### Option 4: Manual Installation

1. **Prerequisites Check**
   ```bash
   node --version
   npm --version
   git --version
   ```

2. **Clone the Repository**
   ```bash
   git clone https://github.com/VitrixLab-Philippines/agy-cli.git
   cd agy-cli
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Install Globally (Optional)**
   ```bash
   sudo npm install -g .
   ```

5. **Verify Installation**
   ```bash
   agy-cli --version
   ```

## 🔗 Setup with Graphify

### Windows (CMD)

#### Using Batch Script
```cmd
setup-with-graphify.bat
```

#### Using Node.js Script
```cmd
node setup-with-graphify.js
```

#### Using Python Script
```cmd
python setup-with-graphify.py
```

### macOS/Linux (Bash)

#### Using Bash Script
```bash
chmod +x setup-with-graphify.sh
./setup-with-graphify.sh
```

#### Using Node.js Script
```bash
node setup-with-graphify.js
```

#### Using Python Script
```bash
python3 setup-with-graphify.py
```

### What These Scripts Do

All three setup-with-graphify scripts perform the same tasks:
- ✅ Installs agy-cli dependencies
- ✅ Clones graphify repository (or updates if it exists)
- ✅ Installs graphify dependencies
- ✅ Optionally installs both tools globally
- ✅ Verifies both installations
- ✅ Provides setup instructions for running both tools

## 🚀 Quick Start

### Basic Usage

```bash
# Initialize a new project
agy-cli init

# Run the CLI
agy-cli

# With graphify integration
agy-cli --with-graphify

# Check version
agy-cli --version

# Get help
agy-cli --help
```

### With Graphify Integration

```bash
# Start with graphify visualization
agy-cli start --graphify

# Generate graphs
graphify generate

# Export results
agy-cli export --format json
```

## ✅ Requirements

- **Node.js** v14.0.0 or higher
- **npm** v6.0.0 or higher
- **Git** v2.0.0 or higher (for cloning repositories)
- **Python** 3.6+ (optional, only if using Python setup scripts)
- **Windows 10+** / **macOS 10.15+** / **Linux (any modern distro)**

## 📚 Training Resources

### Setup Script Comparison

| Feature | Batch (.bat) | Bash (.sh) | Node.js (.js) | Python (.py) |
|---------|--------------|-----------|---------------|--------------|
| Platform | Windows Only | Linux/macOS | Windows/Linux/macOS | Windows/Linux/macOS |
| Learning Curve | Easy | Easy | Medium | Easy |
| Best For | Windows Users | Unix Users | JS Developers | Python Developers |
| Color Output | Yes | Yes | Yes | Yes |
| Error Handling | Good | Good | Excellent | Excellent |
| Dependencies | None | None | Node.js | Python 3.6+ |

### Understanding the Setup Scripts

#### What Happens When You Run a Setup Script?

1. **Prerequisites Check** - Verifies Node.js, npm, and Git are installed
2. **Dependency Installation** - Runs `npm install` to download packages
3. **Global Installation** - Optionally makes the CLI available everywhere
4. **Verification** - Tests that everything works correctly
5. **Guidance** - Shows next steps to get started

#### Why Multiple Script Formats?

- **Batch (.bat)** - Native Windows scripting, no additional software needed
- **Bash (.sh)** - Standard Unix/Linux/macOS scripting
- **Node.js (.js)** - For developers familiar with JavaScript
- **Python (.py)** - For data scientists and Python developers

### Learning Paths

#### For Beginners
1. Run the appropriate setup script (batch, bash, or Python)
2. Follow the on-screen instructions
3. Start with `agy-cli init` command
4. Explore examples in the `examples/` directory

#### For JavaScript Developers
1. Review `setup.js` to understand Node.js process management
2. Read the source code in `src/` directory
3. Create custom scripts based on the provided examples
4. Extend functionality as needed

#### For Python Developers
1. Review `setup.py` to understand Python subprocess usage
2. Set up integration scripts between Python and Node.js
3. Create data pipelines combining both ecosystems
4. Use AGY CLI for data processing workflows

#### For DevOps/System Administrators
1. Study the batch and bash scripts
2. Integrate into deployment pipelines
3. Automate setup across multiple machines
4. Monitor installation logs for troubleshooting

### Script Source Code Learning

All setup scripts are available for review:
- `setup.bat` - Windows Batch scripting
- `setup.sh` - Bash/Shell scripting
- `setup.js` - Node.js scripting (see Node Scripts section)
- `setup.py` - Python scripting (see Python Scripts section)

Each script is well-commented for educational purposes.

## 🛠️ Troubleshooting

### npm command not found
```bash
# Ensure Node.js and npm are in PATH
# Restart your terminal after installation
```

### Permission denied (Linux/macOS with Bash scripts)
```bash
# Grant execute permissions
chmod +x setup.sh
chmod +x setup-with-graphify.sh
```

### Port already in use
```bash
# Use a different port
agy-cli --port 3001
```

### Script execution blocked (Windows)
```powershell
# If batch script won't run, try:
powershell -ExecutionPolicy Bypass -File setup.bat
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Created by VitrixLab Philippines - For Training & Learning**
