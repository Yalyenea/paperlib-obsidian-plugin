# PaperLib Obsidian Plugin

This plugin integrates PaperLib with Obsidian, providing a seamless workflow for managing academic papers and notes.

## Features

- Open or create paper notes in Obsidian directly from PaperLib using the `obsidian://` protocol.
- Customize note templates with placeholders for metadata such as title, authors, year, DOI, and ID.
- Specify a custom folder for storing paper notes.
- Manually create paper notes within Obsidian.
- Bi-directional navigation between PaperLib and Obsidian.

## Installation

### Production Environment

1. Download the latest plugin package from the [Releases](https://github.com/yourusername/paperlib-obsidian-plugin/releases) page.
2. Extract the package into your Obsidian plugins folder (e.g., `YourVault/.obsidian/plugins/paperlib-obsidian-plugin/`).
3. Enable the plugin in Obsidian settings.

### Development Environment

```bash
npm install
npm run build
```

## Usage

### Opening Notes from PaperLib

- Select a paper in PaperLib, right-click and choose "Open in Obsidian" or use the command palette.
- The first time you open a paper, a new note will be created with metadata automatically filled in.
- Subsequent openings will directly navigate to the existing note.

### Manually Creating Paper Notes in Obsidian

- Open the command palette and search for `PaperLib: Create new paper note`.
- Fill in the paper details in the modal to create a new note.

## Configuration

### Settings

- **Papers Folder**: Define the folder where paper notes will be stored.
- **Note Template**: Customize the template for new paper notes using placeholders like `{{title}}`, `{{authors}}`, `{{year}}`, `{{doi}}`, and `{{id}}`.
- **Enable Protocol Handler**: Allow opening notes directly from PaperLib using the `obsidian://` protocol.

### Template Placeholders

You can use the following placeholders in your note template:

- `{{title}}`: The paper title
- `{{authors}}`: The paper authors
- `{{year}}`: The publication year
- `{{doi}}`: The DOI (Digital Object Identifier)
- `{{id}}`: The unique identifier from PaperLib

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/paperlib-obsidian-plugin.git

# Install dependencies
cd paperlib-obsidian-plugin
npm install

# Build the plugin
npm run build
```

## Manual Installation

- Copy `main.js`, `styles.css`, and `manifest.json` to your vault's plugin folder: `VaultFolder/.obsidian/plugins/paperlib-obsidian-plugin/`.

## License

MIT
