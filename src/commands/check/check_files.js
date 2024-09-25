import fs from 'node:fs';
import path from 'node:path';
import { checkFile } from '../../utils/file_util.js';

export function checkAllFiles(dir, options = {}) {
    const allIDs = [];
    const duplicateIDs = [];

    const filesToCheck = traverseDirectory(dir, options).slice(0, 100);

    filesToCheck.map(async (file) => {
        const ids = await checkFile(file);
        
        ids.map((id) => {
            if (allIDs.includes(id)) {
                duplicateIDs.push(id);
            } else {
                allIDs.push(id);
            }
        })
    });
    
    return duplicateIDs;
}

export function traverseDirectory(dir, options = {}) {
    let results = [];
    const { extensions = [], excludeDirs = [] } = options;

    function shouldIncludeFile(filePath) {
        const fileExtension = path.extname(filePath).slice(1);

        if (extensions.length > 0) {
            return extensions.includes(fileExtension);
        }

        return true;
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