"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const createErrorFactory = (statusCode) => (code, message, details = []) => Object.assign(new Error(message), {
    statusCode,
    message,
    code,
    details
});
const badRequest = createErrorFactory(400);
const unauthorized = createErrorFactory(401);
const paymentRequired = createErrorFactory(402);
const forbidden = createErrorFactory(403);
const notFound = createErrorFactory(404);
const conflict = createErrorFactory(409);
const badData = createErrorFactory(422);
const illegal = createErrorFactory(451);
const internal = createErrorFactory(500);
const NOT_FOUND = (message = 'Unable to find the requested entity.', details = []) => notFound('NotFound', message, details);
exports.errors = {
    generic: {
        NOT_FOUND
    },
    badRequest,
    unauthorized,
    paymentRequired,
    forbidden,
    notFound,
    conflict,
    badData,
    illegal,
    internal
};
//# sourceMappingURL=errors.js.map