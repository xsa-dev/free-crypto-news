# 🌍 Internationalization (i18n) Directory

This directory contains auto-generated translations of the project documentation.

## Supported Languages (18 Total)

| Code | Language | Region |
|------|----------|--------|
| `en-US` | English | United States |
| `ar` | Arabic | — |
| `bg-BG` | Bulgarian | Bulgaria |
| `de-DE` | German | Germany |
| `es-ES` | Spanish | Spain |
| `fa-IR` | Persian | Iran |
| `fr-FR` | French | France |
| `it-IT` | Italian | Italy |
| `ja-JP` | Japanese | Japan |
| `ko-KR` | Korean | South Korea |
| `nl-NL` | Dutch | Netherlands |
| `pl-PL` | Polish | Poland |
| `pt-BR` | Portuguese | Brazil |
| `ru-RU` | Russian | Russia |
| `tr-TR` | Turkish | Turkey |
| `vi-VN` | Vietnamese | Vietnam |
| `zh-CN` | Chinese (Simplified) | China |
| `zh-TW` | Chinese (Traditional) | Taiwan |

## File Structure

Each source file gets its own folder with translations (matching [defi-agents](https://github.com/nirholas/defi-agents/tree/main/locales)):

```
locales/
├── README/                 # Translations for README.md
│   ├── index.md           # en-US (source copy)
│   ├── index.ar.md        # Arabic
│   ├── index.zh-CN.md     # Simplified Chinese
│   ├── index.zh-TW.md     # Traditional Chinese
│   ├── index.ja-JP.md     # Japanese
│   └── ...                # 17 total translation files
├── docs/                  # Translations for docs/ files
│   └── API/
│       ├── index.md       # en-US
│       └── index.zh-CN.md # Chinese API docs
└── README.md              # This file
```

## How It Works

1. **Source files** are written in English (`en-US`)
2. **GitHub Action** triggers on changes to Markdown files
3. **OpenAI GPT** translates content while preserving Markdown structure
4. **Auto-commit** pushes translations back to the repository

## Usage

### Viewing Translated Content

Access translated README using the folder-per-source structure:
```
/locales/{source}/index.{locale}.md
```

Example:
- Chinese: `/locales/README/index.zh-CN.md`
- Japanese: `/locales/README/index.ja-JP.md`
- Spanish: `/locales/README/index.es-ES.md`

### Manual Translation

Run locally (requires `OPENAI_API_KEY`):

```bash
# Translate all files
npm run i18n:translate

# Translate specific file
node scripts/i18n/translate.js --file README.md --locale zh-CN

# Validate translations
npm run i18n:validate
```

## Configuration

See [`.i18nrc.js`](../.i18nrc.js) for:
- Target locales
- Source files to translate
- OpenAI model settings
- Field selectors

## Contributing Translations

While translations are auto-generated, you can:

1. **Report issues** with specific translations
2. **Submit PRs** with manual corrections
3. **Add new source content** (translations auto-generate)

Note: Manual edits to translation files may be overwritten on the next auto-translation run.

## Credits

Translation workflow inspired by:
- [plugin.delivery](https://github.com/nirholas/plugin.delivery)
- [defi-agents](https://github.com/nirholas/defi-agents)
