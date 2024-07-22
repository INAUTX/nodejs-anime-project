const errorHandle = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({"error": err.message, "message": "ocurrió un error en el servidor"});
}

module.exports = errorHandle