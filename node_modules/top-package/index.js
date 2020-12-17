const path = require('path');
const fs = require('fs');

function getTopPackagePath(thisPackagePath = '.') {
	let packagePath = path.resolve(thisPackagePath);
	// find root package
	while (true) {
		let nodeModulesPath = path.resolve(path.join(packagePath, '..'));
		if (path.basename(nodeModulesPath).startsWith('@')) {
			// scoped package, go up one more
			nodeModulesPath = path.resolve(path.join(packagePath, '..'));
		}
		if (path.basename(nodeModulesPath) !== 'node_modules') {
			// hello, monorepo
			break;
		}
		const nextPackagePath = path.resolve(path.join(nodeModulesPath, '..'));

		if (nextPackagePath === packagePath) {
			// this is weird, we arrived at the root of the whole path hierarchy without finding a non-package folder
			throw new Error('Arrived at root of path hierarchy but found no non-package folder');
		}

		if (!fs.existsSync(path.join(nextPackagePath, 'package.json'))) {
			// last dir was the root package
			break;
		}

		packagePath = nextPackagePath;
	}

	return packagePath;
}

function getTopPackageDependencies(thisPackagePath = '.', dev = false) {
	const packagePath = getTopPackagePath(thisPackagePath);
	const packageJson = require(path.join(packagePath, 'package.json'));
	const dependencies = packageJson[dev ? 'devDependencies' : 'dependencies'];
	return dependencies || {};
}

module.exports = {
	default: getTopPackagePath,
	getTopPackageDependencies
};

