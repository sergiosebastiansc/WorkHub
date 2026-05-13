

const fs = require("fs/promises");
const path = require("path");

const espaciosPath = path.join(__dirname, "../../data/espacios.json");

const getAllEspacios = async () => {
    const data = await fs.readFile(espaciosPath, "utf8");
    return JSON.parse(data)
}

module.exports = {
    getAllEspacios
}