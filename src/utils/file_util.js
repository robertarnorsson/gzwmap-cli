import fs from 'node:fs';

export function checkFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            reject(err);
            return;
        }

        const idRegex = /id: "(.*?)"/g;
        const matches = data.matchAll(idRegex);

        const idsFound = [];
        for (const match of matches) {
            idsFound.push(match[1]);
        }

        resolve(idsFound);
        });
    });
}