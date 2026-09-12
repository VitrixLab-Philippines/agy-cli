@echo off
REM AGY-CLI + Graphify Setup Script for Windows
REM This script installs both agy-cli and graphify with all dependencies

setlocal enabledelayedexpansion

echo.
echo ======================================
echo AGY-CLI + Graphify Setup Script
echo ======================================
echo.

REM Check for Node.js
echo Checking prerequisites...
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%

REM Check for npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] npm is not installed
    echo Please install npm
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm found: %NPM_VERSION%

REM Check for Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Git is not installed
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
echo [OK] Git found: %GIT_VERSION%

echo.
echo ======================================
echo Installing AGY-CLI
echo ======================================
echo.

echo [*] Installing agy-cli npm dependencies...
call npm install

if %errorlevel% neq 0 (
    echo [X] Failed to install agy-cli dependencies
    pause
    exit /b 1
)
echo [OK] agy-cli dependencies installed successfully

echo.
echo ======================================
echo Installing Graphify
echo ======================================
echo.

set GRAPHIFY_DIR=..\graphify

if exist "%GRAPHIFY_DIR%" (
    echo [!] Graphify directory already exists at %GRAPHIFY_DIR%
    set /p UPDATE_GRAPHIFY="Do you want to update it? (y/n): "
    
    if /i "!UPDATE_GRAPHIFY!"=="y" (
        echo [*] Updating graphify...
        cd /d "%GRAPHIFY_DIR%"
        call git pull origin main
        call npm install
        cd /d "%~dp0"
    )
) else (
    echo [*] Cloning graphify repository...
    call git clone https://github.com/VitrixLab-Philippines/graphify.git "%GRAPHIFY_DIR%"
    
    if %errorlevel% equ 0 (
        echo [OK] Graphify cloned successfully
        cd /d "%GRAPHIFY_DIR%"
        echo [*] Installing graphify dependencies...
        call npm install
        if %errorlevel% equ 0 (
            echo [OK] Graphify dependencies installed successfully
        ) else (
            echo [X] Failed to install graphify dependencies
            pause
            exit /b 1
        )
        cd /d "%~dp0"
    ) else (
        echo [X] Failed to clone graphify repository
        pause
        exit /b 1
    )
)

echo.
echo ======================================
echo Global Installation
echo ======================================
echo.

set /p GLOBAL_INSTALL="Do you want to install both tools globally? (y/n): "

if /i "%GLOBAL_INSTALL%"=="y" (
    echo [*] Installing agy-cli globally...
    call npm install -g .
    
    if %errorlevel% neq 0 (
        echo [X] Failed to install agy-cli globally
        pause
        exit /b 1
    )
    echo [OK] agy-cli installed globally
    
    echo [*] Installing graphify globally...
    cd /d "%GRAPHIFY_DIR%"
    call npm install -g .
    cd /d "%~dp0"
    
    if %errorlevel% neq 0 (
        echo [X] Failed to install graphify globally
        pause
        exit /b 1
    )
    echo [OK] graphify installed globally
) else (
    echo [!] Skipping global installation
)

echo.
echo ======================================
echo Verification
echo ======================================
echo.

REM Verify agy-cli installation
agy-cli --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('agy-cli --version') do set AGY_VERSION=%%i
    echo [OK] agy-cli is available globally: !AGY_VERSION!
) else (
    echo [!] agy-cli is not available globally, but can be used with: npm run agy-cli
)

REM Verify graphify installation
graphify --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('graphify --version') do set GRAPHIFY_VERSION=%%i
    echo [OK] graphify is available globally: !GRAPHIFY_VERSION!
) else (
    echo [!] graphify is not available globally
)

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo   1. Initialize a new project:
echo      agy-cli init
echo.
echo   2. Start the AGY CLI:
echo      agy-cli start
echo.
echo   3. In another terminal, start Graphify:
echo      cd ..\graphify
echo      graphify start
echo.
echo   4. View your data with Graphify visualization!
echo.
echo Useful commands:
echo   - agy-cli --help
echo   - graphify --help
echo   - agy-cli --with-graphify (run AGY with graphify integration)
echo.
echo Documentation:
echo   - AGY: https://github.com/VitrixLab-Philippines/agy
echo   - Graphify: https://github.com/VitrixLab-Philippines/graphify
echo.

pause
