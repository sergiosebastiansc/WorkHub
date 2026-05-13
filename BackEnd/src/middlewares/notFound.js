const notFound = (req, res) => {
    res.status(404).json({
        msg: "Endpoint no encontrado."
    });

};


module.exports = notFound;