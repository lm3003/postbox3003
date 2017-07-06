import { Error } from './error.model';
import { EventEmitter } from '@angular/core';
var ErrorService = (function () {
    function ErrorService() {
        this.errorOccured = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        var errorObj = new Error(error.title, error.error.message);
        this.errorOccured.emit(errorObj);
    };
    return ErrorService;
}());
export { ErrorService };
