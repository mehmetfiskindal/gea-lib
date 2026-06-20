# GeaJS Library Scaffolder (`create-gea-lib`)

⚡ A fast, flexible, and interactive scaffolding tool to easily bootstrap modern, reactive libraries for GeaJS. With this tool, you can set up a new GeaJS library in seconds with TypeScript or JavaScript, complete with automatic git initialization and dependency installation.

## Features

- 📦 **Pre-configured Templates:** Ready-to-go templates for both JavaScript (`js`) and TypeScript (`ts`).
- ⚙️ **Interactive CLI:** Step-by-step prompts to select your project name, language, and initial setup preferences.
- 🚀 **Silent Mode (Non-Interactive):** Fast creation using CLI flags to skip prompts.
- 🛠️ **Auto-configuration:** Automatic Git initialization and dependency installation using your active package manager (`npm`, `yarn`, `pnpm`, `bun`).

---

## Usage

You can run this tool remotely using `npx` (recommended), or run it locally during development.

### 1. Remote Execution (Recommended)

Since the package is published on npm, you can generate a new GeaJS library anywhere without installing it globally:

```bash
# Using npx (runs interactively by default)
npx create-gea-lib
```

Or you can use the standard npm initializer format:
```bash
npm create gea-lib
```

---

### 2. Command Line Options

You can skip or pre-configure choices by passing arguments to the command:

```bash
npx create-gea-lib <project-name> [options]
```

#### Available Options:

| Option | Description |
| :--- | :--- |
| `<project-name>` | The name of the project/directory to create (e.g., `my-awesome-lib`). |
| `--ts` / `--typescript` | Use the TypeScript template. |
| `--js` / `--javascript` | Use the JavaScript template. |
| `--git` | Automatically initialize a git repository. |
| `--no-git` | Skip initializing a git repository. |
| `--install` | Automatically install dependencies. |
| `--no-install` | Skip installing dependencies. |
| `-y` / `--yes` | Use default choices for all prompts (creates `gea-library` in TypeScript with git and install). |

#### Examples:

**Create a TypeScript project with git and installed dependencies silently:**
```bash
npx create-gea-lib my-ts-lib -y
```

**Create a JavaScript project and skip dependency installation:**
```bash
npx create-gea-lib my-js-lib --js --no-install
```

---

### 3. Local Development & Installation

If you are developing this scaffolder tool locally, you can use these methods:

#### Run locally:
```bash
# In the scaffolder root directory
node ./bin/index.js
# Or:
npm start
```

#### Link locally for testing:
```bash
# Create a global symlink of the package
npm link

# Run it from anywhere on your machine:
create-gea-lib my-library
```

---

## Developing Your New Library

Once your project is created, navigate into the directory and run these commands to start developing:

```bash
# Go to the project directory
cd <project-name>

# Start the interactive sandbox demo environment
npm run dev

# Build the library for NPM distribution
npm run build
```
