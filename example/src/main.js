"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const Application_js_1 = __importDefault(require("./Application.js"));
client_1.default.createRoot(document.getElementById('root')).render(<Application_js_1.default />);
