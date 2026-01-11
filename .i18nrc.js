/**
 * i18n Configuration for Free Crypto News
 * 
 * Auto-translates documentation to 18 languages using OpenAI GPT.
 * Based on the workflow from plugin.delivery and defi-agents.
 */

module.exports = {
  // Fields to extract and translate from source files
  selectors: [
    'title',
    'description',
    'content',
    'meta.title',
    'meta.description',
    'sections',
  ],

  // Source language
  entryLocale: 'en-US',

  // Target languages (18 total) - BCP 47 codes
  outputLocales: [
    'en-US',      // English (default)
    'ar',         // Arabic
    'bg-BG',      // Bulgarian
    'de-DE',      // German
    'es-ES',      // Spanish
    'fa-IR',      // Persian (Farsi)
    'fr-FR',      // French
    'it-IT',      // Italian
    'ja-JP',      // Japanese
    'ko-KR',      // Korean
    'nl-NL',      // Dutch
    'pl-PL',      // Polish
    'pt-BR',      // Portuguese (Brazil)
    'ru-RU',      // Russian
    'tr-TR',      // Turkish
    'vi-VN',      // Vietnamese
    'zh-CN',      // Chinese (Simplified)
    'zh-TW',      // Chinese (Traditional)
  ],

  // OpenAI model configuration
  modelName: 'gpt-4o-mini',
  temperature: 0.5,
  concurrency: 18,

  // Source files to translate (relative to project root)
  sourceFiles: [
    'README.md',
    'docs/API.md',
    'mcp/README.md',
    'sdk/README.md',
    'chatgpt/README.md',
  ],

  // Output directory for translations
  outputDir: 'locales',
};
