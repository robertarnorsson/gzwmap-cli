import { generateRandomId } from "../utils/id_util.js";

export function generateLZId(amount = 1, length = 6) {
    return Array.from({ length: amount }, () => generateRandomId("LZ", length))
};