const responseCustom = (res, statusCode, data) => {
    const success = statusCode >= 200 && statusCode < 300;

    const response = {
        success,
        status: statusCode,
    }

    if (success) {
        response["result"] = data
    } else {
        response["errors"] = data
    }

    res.status(statusCode).json(response);
}

module.exports = responseCustom


