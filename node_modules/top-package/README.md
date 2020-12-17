# top-package

Finds the directory of the top package, i.e. the project the consumer of your library is actually working on.

Also works with transitive dependencies that could not be properly flattened (no, we don't just append `../..` to the path).

Mostly useful in package lifecycle scripts such as `postinstall` where the current working directory is your package root.

## Installation

	yarn add top-package

or using npm:

	npm install top-package

## Usage

```js
import getTopPackagePath from 'top-package';

// suppose that your package is in /home/you/projects/my-cool-ui/node_modules/your-awesome-lib
// and the current working directory is /home/you/projects/my-cool-ui/node_modules/your-awesome-lib/lib/util
// first, we need to get to the root of your package if we're not already there
const currentPackagePath = '../..';

// then we can find the root of cool-ui
const topPackagePath = getTopPackagePath(currentPagePath);

// => /home/you/projects/cool-ui
```

## API

### `getTopPackagePath([currentPackagePath])`

`import getTopPackagePath from 'top-package';`

#### currentPackagePath
Type: `string`
Default: `'.'`

Path to the root of your package. Can be relative (to the current working directory)

#### Return value
Type: `string`

(Absolute) path to the root of the top package.

### `getTopPackageDependencies([currentPackagePath], [dev])`

`import {getTopPackageDependencies} from 'top-package';`

#### currentPackagePath
Type: `string`
Default: `'.'`

Path to the root of your package. Can be relative (to the current working directory)

#### dev
Type: `boolean`
Default: `false`

Whether to get the dev dependencies of the top package. By default, this function gets the "regular" dependencies.

#### Return value
Type: `object`

An object that maps the name of the dependency to its SemVer version string specified in the top package's `package.json` file.
