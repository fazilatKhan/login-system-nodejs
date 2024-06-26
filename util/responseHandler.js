const ResponseEntity = require('./ResponseEntity');


class ResponseHandler {
    static async handleServerError(res, error) {
        console.error('Server Error:', error);

        const errorResponse = new ResponseEntity(
            null,
            500, // HTTP status code for internal server error
            'failed',
            error.message || 'Internal Server Error'
        );

        res.status(500).json(errorResponse);
    }

    static async handleServerDataCreated(res, data) {
        const response = new ResponseEntity(data, 200, 'success', 'Data saved successfully'); // Changed to 200
        res.status(200).json(response);
    }

    static async handleServerDataGet(res, data) {
        const response = new ResponseEntity(data, 200, 'success', 'Data fetched successfully');
        res.status(200).json(response);
    }

    // Add other response handling methods as per your application's requirements
}

module.exports = ResponseHandler;
