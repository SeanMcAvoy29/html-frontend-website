"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.validateProduct = function (product) {
    if (product.name.length > 50) {
        return "Name Greater than 50 Characters";
    }
    if (product.description.length > 500) {
        return "Description Greater than 500 Characters";
    }
    if (product.price < 10) {
        return "Price less than £10";
    }
    return null;
};
//# sourceMappingURL=productValidator.js.map