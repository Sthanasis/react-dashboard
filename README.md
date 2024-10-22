# Disney Characters Dashboard

A react app that displays disney characters using the `https://disneyapi.dev/` api

## Prerequisites

- node v20.18.0
- npm v10.8.2

## Project setup

```
npm ci
```

### Compiles and hot reloads for development

```
npm run dev

You may access the local dev environment on http://localhost:5173
```

### Runs tests and watces for latest changes

```
npm run test
```

### ESLint rules

Most rules are being applied via `eslint.config.js` file. Make sure to use an IDE plugin to automatically respect and format the needed files. You can also run the linter.

```
npm run lint
```

## Release Process

The app is deployed to github pages and an automation release process is in place. To trigger it:

- commit on main branch.
- create a pull request to the production branch.
- merge the pull request.

## Project deploy URL

https://sthanasis.github.io/react-dashboard/
