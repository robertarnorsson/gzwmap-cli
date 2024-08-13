export function generateRandomId(prefix, length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
        randomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${randomId}`;
}

function cleanPrefix(input) {
    const cleaned = input.trim().toUpperCase();
    return /^[A-Z]+$/.test(cleaned) ? cleaned : null;
}