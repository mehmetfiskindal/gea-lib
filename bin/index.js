#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import prompts from 'prompts';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper: Run a command in a child process
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { stdio: 'inherit', shell: true, ...options });
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    process.on('error', (err) => {
      reject(err);
    });
  });
}

// Helper: Convert project-name to CamelCase library name
function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

// Helper: Recursively copy directory and replace placeholders
async function copyDir(src, dest, replacements) {
  const stat = await fs.lstat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      let destEntryName = entry;
      // Rename _gitignore to .gitignore
      if (entry === '_gitignore') {
        destEntryName = '.gitignore';
      }
      const destPath = path.join(dest, destEntryName);
      await copyDir(srcPath, destPath, replacements);
    }
  } else {
    // Read file, replace templates, write to dest
    let content = await fs.readFile(src, 'utf8');
    for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(`<%\\s*${key}\\s*%>`, 'g');
      content = content.replace(regex, value);
    }
    await fs.writeFile(dest, content, 'utf8');
  }
}

// Helper: Detect the active package manager
function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.includes('yarn')) return 'yarn';
  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('bun')) return 'bun';
  return 'npm';
}

async function main() {
  console.log('\n' + pc.cyan(pc.bold('⚡ GeaJS Library Scaffolder ⚡')) + '\n');

  const args = process.argv.slice(2);
  const cliOptions = {
    projectName: args.find(a => !a.startsWith('-')),
    language: args.includes('--ts') || args.includes('--typescript') ? 'ts' : (args.includes('--js') || args.includes('--javascript') ? 'js' : null),
    gitInit: args.includes('--no-git') ? false : (args.includes('--git') ? true : null),
    installDeps: args.includes('--no-install') ? false : (args.includes('--install') ? true : null),
    yes: args.includes('-y') || args.includes('--yes')
  };

  let projectName = cliOptions.projectName;
  let language = cliOptions.language;
  let gitInit = cliOptions.gitInit;
  let installDeps = cliOptions.installDeps;

  if (cliOptions.yes) {
    if (!projectName) projectName = 'gea-library';
    if (!language) language = 'ts';
    if (gitInit === null) gitInit = true;
    if (installDeps === null) installDeps = true;
  } else {
    const questions = [];

    if (!projectName) {
      questions.push({
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: 'gea-library',
        validate: (value) => (value.trim().length > 0 ? true : 'Please enter a project name')
      });
    }

    if (!language) {
      questions.push({
        type: 'select',
        name: 'language',
        message: 'Select programming language:',
        choices: [
          { title: pc.blue('TypeScript'), value: 'ts' },
          { title: pc.yellow('JavaScript'), value: 'js' }
        ],
        initial: 0
      });
    }

    if (gitInit === null) {
      questions.push({
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        initial: true
      });
    }

    if (installDeps === null) {
      questions.push({
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies automatically?',
        initial: true
      });
    }

    if (questions.length > 0) {
      const response = await prompts(questions, {
        onCancel: () => {
          console.log(pc.red('\n✖ Scaffolding cancelled.'));
          process.exit(1);
        }
      });

      if (!projectName) projectName = response.projectName;
      if (!language) language = response.language;
      if (gitInit === null) gitInit = response.gitInit;
      if (installDeps === null) installDeps = response.installDeps;
    }
  }

  const projectDir = path.resolve(process.cwd(), projectName);
  const pkgName = path.basename(projectName).toLowerCase().replace(/[^a-z0-9-_]/g, '');
  const libraryName = toCamelCase(pkgName);

  console.log(`\nCreating GeaJS library in ${pc.green(projectDir)}...\n`);

  // Source template path
  const templatePath = path.resolve(__dirname, '../templates', language);

  try {
    // Copy template files
    await copyDir(templatePath, projectDir, {
      projectName: pkgName,
      libraryName: libraryName
    });

    // Git initialization
    if (gitInit) {
      console.log(pc.dim('Initializing git repository...'));
      try {
        await runCommand('git', ['init'], { cwd: projectDir });
      } catch (err) {
        console.warn(pc.yellow('⚠ Could not initialize git repository: ' + err.message));
      }
    }

    // Dependency installation
    const pkgManager = detectPackageManager();
    if (installDeps) {
      console.log(pc.dim(`Installing dependencies using ${pkgManager}...`));
      try {
        const installArgs = pkgManager === 'yarn' ? [] : ['install'];
        await runCommand(pkgManager, installArgs, { cwd: projectDir });
        console.log(pc.green('\n✔ Dependencies installed successfully!'));
      } catch (err) {
        console.error(pc.red(`\n✖ Failed to install dependencies: ${err.message}`));
      }
    }

    // Success Screen
    console.log('\n' + pc.green(pc.bold('🎉 Project created successfully!')) + '\n');
    console.log('To get started:');
    
    if (path.resolve(process.cwd()) !== projectDir) {
      console.log(`  ${pc.cyan(`cd ${projectName}`)}`);
    }

    if (!installDeps) {
      console.log(`  ${pc.cyan(`${pkgManager} install`)}`);
    }

    console.log(`  ${pc.cyan(`${pkgManager} run dev`)}  ${pc.dim('# Starts interactive demo sandbox')}`);
    console.log(`  ${pc.cyan(`${pkgManager} run build`)} ${pc.dim('# Builds library for NPM distribution')}`);
    console.log('\nHappy coding with GeaJS!\n');

  } catch (error) {
    console.error(pc.red(`\n✖ Scaffolding failed: ${error.message}`));
    process.exit(1);
  }
}

main();
