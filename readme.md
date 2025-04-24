# PaperLib Obsidian Plugin

This plugin integrates PaperLib with Obsidian, providing a seamless workflow for managing academic papers and notes.

The obsidian plugin is in [obsidian-paperlib-plugin](https://github.com/Yalyenea/obsidian-paperlib-plugin).

## Features

- Open or create paper notes in Obsidian directly from PaperLib.

## Illustration

- paperlib ![](https://yffff.oss-cn-hangzhou.aliyuncs.com/202504242344804.png)
- obsidian note ![](https://yffff.oss-cn-hangzhou.aliyuncs.com/202504242347071.png)

## Usage

### Opening Notes from PaperLib

- Select a paper in PaperLib, right-click and choose "Open in Obsidian" or use the command palette.
- The first time you open a paper, a new note will be created with metadata automatically filled in.
- Subsequent openings will directly navigate to the existing note.

### Manually Creating Paper Notes in Obsidian

- Open the command palette and search for `PaperLib: Create new paper note`.
- Fill in the paper details in the modal to create a new note.

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/paperlib-obsidian-plugin.git

# Install dependencies
cd paperlib-obsidian-plugin
npm install // yarn install

# Build the plugin
npm run build // yarn build
```
