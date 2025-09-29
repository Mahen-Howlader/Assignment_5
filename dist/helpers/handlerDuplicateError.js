"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
const handlerDuplicateError = (err) => {
    const duplicate = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${duplicate ? duplicate[1] : "Value"} already exists!!`,
    };
};
exports.handlerDuplicateError = handlerDuplicateError;
