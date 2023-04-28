function successResponse(code, message,data,res) {
    res.status(code).json({
        code:code.toString(),
        message:message,
        data:data
    })
}

function invalidParameterResponse( message,res) {
    res.status(401).json({
        code:"401",
        message:message,
        data:[]
    })
}

function serverError(error,res) {
    res.status(500).json({
        code:"500",
        message:error,
        data:[]
    })
}

module.exports = {successResponse,invalidParameterResponse,serverError}