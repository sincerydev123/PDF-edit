# WebViewer UI 

## Install

```
npm install
```

### Install WebViewer Core Dependencies

The preferred method to install the Core dependencies is to use the [WebViewer NPM package](https://docs.apryse.com/documentation/web/get-started/npm/#1-install-via-npm).

Once installed, copy the Core folder into the path being used by the viewer for its dependencies (/lib by default).

## Run

```
npm start
```

## Build

```
npm run build
```

## Troubleshooting

If you are using NPM version 7 or higher, you may get an error indicating an issue with the dependency tree. There are two possible solutions for this:
- Downgrade your version of Node to v14, which uses NPM version 6. 
- When running `npm install` add the flag `--legacy-peer-deps`. You can read more about this flag in this [Stack Overflow post](https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh).

## Project structure

```
src/
  apis/            - APIs exposed in myWebViewer.getInstance()
  components/      - React components
  constants/       - JavaScript or CSS constants
  core/            - APIs from the Core
  event-listeners/ - Listeners for the Core events
  helpers/         - Reused functions
  redux/           - Redux files for state managing
  lib/             - Lib folder created upon npm install, used for dev testing only
```