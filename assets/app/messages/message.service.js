"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageService = /** @class */ (function () {
    function MessageService() {
    }
    MessageService.prototype.addMessage = function (message) {
        this.messages.push(message);
    };
    MessageService.prototype.getMessage = function () {
        return this.messages;
    };
    MessageService.prototype.deleteMessage = function (message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    };
    return MessageService;
}());
exports.MessageService = MessageService;
