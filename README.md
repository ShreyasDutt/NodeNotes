# Simple Notes App

This is a **simple notes app** built using **Node.js**, **Express**, and the **`fs` module**. The app allows users to
create and view notes stored as text files in the local filesystem.

---

## Features

- **Create Notes**: Add new notes with a title and content.
- **List Notes**: View all saved notes on the homepage.
- **File Storage**: Notes are stored as `.txt` files in the `files` directory.
- **Validation**: Ensures note titles are sanitized to avoid invalid file names.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   node app.js
   ```

4. Open your browser and go to:
   ```
   http://localhost:5000
   ```

---

## Directory Structure

```
.
├── app.js             # Main server file
├── files/             # Directory where notes are stored
├── public/            # Static files (CSS, JS, etc.)
├── views/             # EJS templates
└── package.json       # Project metadata and dependencies
```

---

## How It Works

1. **Homepage**:
    - Displays a list of all notes in the `files/` directory.
2. **Create Notes**:
    - Users can add a note with a title and content.
    - The title is sanitized to remove invalid characters before saving.

---

## Requirements

- Node.js v16 or later
- npm
