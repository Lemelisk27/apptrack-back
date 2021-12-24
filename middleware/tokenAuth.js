const jwt = require("jsonwebtoken")

const tokenAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ").pop()
        jwt.verify(token, process.env.JWT_SECRET, function (err,data){
            if(err) {
                console.log(err)
                return res.status(403).json({Message: "Invalid Token", err:err})
            }
            else {
                console.log("Success")
                req.user = data
                next()
            }
        })
    }
    else res.status(403).json({Message: "Include a Token"})
}

module.exports = tokenAuth