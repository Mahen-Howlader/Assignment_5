"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/api/v1", routes_1.router);
exports.app.get("/", (req, res) => {
    res.send("Hello World");
});
exports.app.use(globalErrorHandler_1.globalErrorHandler);
exports.app.use(notFound_1.default);
