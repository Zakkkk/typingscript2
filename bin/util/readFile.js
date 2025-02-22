"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
async function readFileByStream(filePath, onLine) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath);
        fileStream.on("error", (err) => {
            console.error("Error with file stream:", err);
            reject(err);
        });
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        rl.on("line", (line) => {
            try {
                onLine(line);
            }
            catch (err) {
                console.error("Error in line callback:", err);
                rl.close();
                reject(err);
            }
        });
        rl.on("close", () => {
            resolve();
        });
        rl.on("error", (err) => {
            reject(err);
        });
    });
}
exports.default = readFileByStream;
