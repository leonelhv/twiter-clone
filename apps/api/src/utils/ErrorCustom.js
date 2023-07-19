class ErrorCustom extends Error {
    constructor(message, status = 500) {
        super(message)
        this.statusCode = status
    }
}

module.exports = { ErrorCustom }