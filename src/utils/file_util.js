import fs from 'node:fs';

export function checkFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const idRegex = /id: "(.*?)"/g;
            const idsFound = [];
            const lines = data.split('\n');

            lines.forEach((line, index) => {
                const matches = [...line.matchAll(idRegex)];
                matches.forEach(match => {
                    idsFound.push({
                        id: match[1],
                        filePath: filePath,
                        lineNumber: index + 1
                    });
                });
            });

            resolve(idsFound);
        });
    });
}
