const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    const errorResponse = {
        success: false,
        status: errStatus,
        message: errMsg,
    };

    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(errStatus).json(errorResponse);
};

module.exports = ErrorHandler;
