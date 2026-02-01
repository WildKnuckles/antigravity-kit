#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

if (command !== "init") {
    console.log('Usage: npx mindware-antigravity-kit init');
    process.exit(1);
}

const sourceDir = path.join(__dirname, "..", ".agent");
const targetDir = path.join(process.cwd(), '.agent');

if (!fs.existsSync(sourceDir)) {
  console.error('Error: Source .agent directory not found in package.');
  process.exit(1);
}

if (sourceDir === targetDir) {
  console.error('Error: You are running this command inside the package itself. Please run it in a target project.');
  process.exit(1);
}

console.log("Installing Antigravity Kit...");

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    copyDir(sourceDir, targetDir);
    console.log("✅ Antigravity Kit installed successfully in .agent/");
} catch (err) {
    console.error("Failed to install:", err);
    process.exit(1);
}
