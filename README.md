# DatoCMS Crowdin Translations Plugin

[![npm version](https://badge.fury.io/js/datocms-plugin-crowdin-translations.svg)](https://badge.fury.io/js/datocms-plugin-crowdin-translations)

A DatoCMS plugin that seamlessly integrates with Crowdin to manage multilingual content translations, allowing you to send content to Crowdin for translation and then pull it back into DatoCMS with minimal effort.

![Plugin Cover](./docs/cover.png)

## Features

- Send DatoCMS content directly to Crowdin for translation
- Monitor translation progress for each language
- Pull translated content back into DatoCMS
- Configure field preferences to control which field types get sent to Crowdin
- Support for complex field types including structured text, blocks, and assets
- Smart handling of SEO fields, JSON fields, and other specialized content types

## Requirements

- A DatoCMS account
- A Crowdin account with API access
- An API token from Crowdin

## Installation

### Plugin Installation

The plugin can be installed from the DatoCMS interface:

1. In your DatoCMS project, go to **Settings > Plugins**
2. Click on **Add** (+) to add a new plugin
3. Search for "Crowdin Translations"
4. Click **Install**

## Configuration

After installing the plugin, you need to configure it with your Crowdin API credentials:

1. Go to **Settings > Plugins > Crowdin Translations**
2. Enter the following information:
   - **Crowdin API Key**: Your Crowdin API v2 token
   - **Crowdin Project ID**: The ID of your Crowdin project
   - **Source Locale**: The locale code in DatoCMS that will be used as the source for translations

### Field Preferences

You can configure which field types will be included in the translation process:

- **Location Fields**: Whether to include location fields
- **JSON Fields**: Whether to include JSON fields
- **Date Fields**: Whether to include date fields
- **Color Fields**: Whether to include color fields
- **Number/Link Fields**: Whether to include number and link fields
- **SEO Fields**: Whether to include SEO fields
- **Structured Text and Block Fields**: Whether to include structured text and block fields

## Usage

### Sending Content to Crowdin

1. Navigate to any record in DatoCMS that has translatable fields
2. Open the Crowdin Translations plugin interface
3. Select the target languages you want to translate to
4. Click **Send to Crowdin**

The plugin will:
- Prepare your content for translation
- Upload it to Crowdin as a translation job
- Provide you with a confirmation and link to the job in Crowdin

### Checking Translation Progress

1. Open the Crowdin Translations plugin for a record
2. The interface will display the current translation progress for each language
3. Progress is shown as a percentage of translated and approved content

### Importing Translations

1. Once your content has been translated in Crowdin
2. Open the Crowdin Translations plugin for the record
3. Click **Import Translations**
4. Select which languages to import
5. The translated content will be applied to your DatoCMS record

## Advanced Usage

### Custom Field Handling

The plugin includes specialized handling for different field types:

- **Structured Text**: The plugin flattens structured text fields to make them translatable while preserving their structure
- **Block Fields**: Modular blocks are processed to ensure proper translation while maintaining their relationships
- **Asset Fields**: Asset metadata can be translated while preserving the asset structure itself
- **SEO Fields**: SEO fields are handled as a unit to maintain their structure

### Common Issues

- **Authentication Errors**: Ensure your Crowdin API key has the correct permissions
- **Missing Fields**: Check your field preferences to ensure the field types you want to translate are enabled

### Local Development

To run the plugin locally for development:

```bash
# Clone the repository
git clone https://github.com/marcelofinamorvieira/datocms-plugin-crowdin-translations.git
cd datocms-plugin-crowdin-translations

# Install dependencies
npm install

# Start the development server
npm start
```

## Contributing

Contributions and feature requests on issues are welcome! Please feel free to submit a Pull Request or open an issue if you find one :)

## License

This project is licensed under the MIT License - see the LICENSE file for details.