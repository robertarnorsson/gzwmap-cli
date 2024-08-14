import fs from 'node:fs';
import path from 'node:path';

export function checkAllFiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const fullPaths = files.map(file => path.join(dir, file));
                resolve(fullPaths);
            }
        });
    });
}