import fs from 'node:fs';
import path from 'node:path';
import { checkFile } from '../../utils/file_util.js';

export async function checkAllFiles(dir, options = {}) {
    const allIDs = new Map();
    const duplicateIDs = new Map();

    const filesToCheck = traverseDirectory(dir, options);

    const fileCheckPromises = filesToCheck.map(async (file) => {
        const ids = await checkFile(file);

        ids.forEach(({ id, filePath, lineNumber }) => {
            if (allIDs.has(id)) {
                if (!duplicateIDs.has(id)) {
                    duplicateIDs.set(id, [...allIDs.get(id)]);
                }
                duplicateIDs.get(id).push({ filePath, lineNumber });
            } else {
                allIDs.set(id, [{ filePath, lineNumber }]);
            }
        });
    });

    await Promise.all(fileCheckPromises);

    return Array.from(duplicateIDs.entries()).map(([id, occurrences]) => ({
        id,
        occurrences,
    }));
}

export function traverseDirectory(dir, options = {}) {
    let results = [];
    const { extensions = [], excludeDirs = [] } = options;

    function shouldIncludeFile(filePath) {
        const fileExtension = path.extname(filePath).slice(1);
        return extensions.length > 0 ? extensions.includes(fileExtension) : true;
    }

    function shouldExcludeDir(dirPath) {
        return excludeDirs.some(dirName => dirPath.includes(dirName));
    }

    function readDir(directory) {
        const items = fs.readdirSync(directory);

        items.forEach(item => {
            const fullPath = path.join(directory, item);
            const stat = fs.statSync(fullPath);

            if (stat && stat.isDirectory()) {
                if (!shouldExcludeDir(fullPath)) {
                    readDir(fullPath);
                }
            } else if (shouldIncludeFile(fullPath)) {
                results.push(fullPath);
            }
        });
    }

    readDir(dir);
    return results;
}
