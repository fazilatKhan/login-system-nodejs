class ResponseEntity {
    constructor(data, statusCode, status, message) {
        this.data = data;
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}
    
module.exports = ResponseEntity;
