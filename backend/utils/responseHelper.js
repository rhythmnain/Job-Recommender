//backend/utils/responseHelper.js
function successResponse(data, message = "Success") {
    return { status: "success", message, data };
}

function errorResponse(message = "Error", code = 500) {
    return { status: "error", message, code };
}

module.exports = { successResponse, errorResponse };
