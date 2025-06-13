import {
  pathJoin,
  readFileToJsonSync,
  writeJsonFile,
  getDirectoryBy,
} from 'a-node-tools';

const packageJson = readFileToJsonSync('./dist/package.json');

const newName = 'create-a-pkg';
packageJson.name = newName;
packageJson.bin = Object.fromEntries([[newName, './bin.mjs']]);

{
  //  写入 package.json

  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
