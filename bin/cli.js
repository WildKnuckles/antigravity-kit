#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

// Help / Usage
if (!command || args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage:
  npx mindware-antigravity-kit init          # Initialize .agent in current project
  npx mindware-antigravity-kit create <name> # Create new web project with structure
    `);
    process.exit(0);
}

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        // Skip common build/dependency folders that shouldn't be copied
        if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git" || entry.name === "dist") continue;

        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

if (command === "init") {
    const sourceDir = path.join(__dirname, "..", ".agent");
    const targetDir = path.join(process.cwd(), '.agent');

    if (!fs.existsSync(sourceDir)) {
        console.error('Error: Source .agent directory not found in package.');
        process.exit(1);
    }

    if (path.resolve(sourceDir) === path.resolve(targetDir)) {
         console.log("Antigravity Kit (.agent) is already here.");
         process.exit(0);
    }

    console.log("Initializing Antigravity Kit (.agent)...");
    try {
        copyDir(sourceDir, targetDir);
        console.log("✅ Antigravity Kit installed successfully in .agent/");
    } catch (err) {
        console.error("Failed to install:", err);
        process.exit(1);
    }

} else if (command === "create") {
    const projectName = args[1];

    if (!projectName) {
        console.error("Please specify a project name: npx mindware-antigravity-kit create <project-name>");
        process.exit(1);
    }

    const targetDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetDir) && projectName !== '.' && projectName !== './') {
        console.error(`Error: Directory ${projectName} already exists. Please choose a different name or remove the existing directory.
To install in the current directory, use '.' as the project name.`);
        process.exit(1);
    }

    const sourceDir = path.join(__dirname, "..", "web");

    if (!fs.existsSync(sourceDir)) {
        console.error(`Error: Template directory 'web' not found in package. Path: ${sourceDir}`);
        process.exit(1);
    }

    console.log(`Creating project ${projectName}...`);
    try {
        copyDir(sourceDir, targetDir);

        // Update package.json
        const packageJsonPath = path.join(targetDir, "package.json");
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = require(packageJsonPath);
            packageJson.name = path.basename(projectName);
            packageJson.version = "0.1.0";
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        }

        console.log(`✅ Project ${projectName} created successfully!`);
        console.log(`\nNext steps:\n  cd ${projectName}\n  npm install\n  npm run dev`);
    } catch (err) {
         console.error("Failed to create project:", err);
         process.exit(1);
    }

} else {
    console.log('Unknown command. Try "init" or "create".');
    process.exit(1);
}
