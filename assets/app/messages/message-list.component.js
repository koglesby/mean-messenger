"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_model_1 = require("./message.model");
var MessageListComponent = /** @class */ (function () {
    function MessageListComponent() {
        this.messages = [
            new message_model_1.Message('a new message', 'Kevers'),
            new message_model_1.Message('different message', 'Kev')
        ];
    }
    MessageListComponent = __decorate([
        core_1.Component({
            selector: 'app-message-list',
            template: "\n      <div class=\"col-md-8 col-md-offset-2\">\n        <app-message\n          [message]=\"message\"\n          (editClicked)=\"message.content = $event\"\n          *ngFor=\"let message of messages\"></app-message>\n      </div>\n  "
        })
    ], MessageListComponent);
    return MessageListComponent;
}());
exports.MessageListComponent = MessageListComponent;
