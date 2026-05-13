const fs = require("fs/promises");
const path = require("path");

const reservasPath = path.join(__dirname, "../../data/reservas.json");


// leer las reservas
const readReservas = async () => {
     const data = await fs.readFile(reservasPath, "utf8");
        return JSON.parse(data)
}

// escribir las reservas
const writeReservas = async (reservas) => {
    await fs.writeFile(reservasPath, JSON.stringify(reservas, null, 2), "utf8");
}


// obtener todas las reservas
const getAllReservas = async () => {
    return await readReservas();
}
//crear nueva reserva
const createReserva = async (nuevaReserva) => {
    const reservas = await readReservas();
    reservas.push(nuevaReserva);
    await writeReservas(reservas);
    return nuevaReserva;
}

// actualizar reserva

const updateReserva = async (actualizarReserva) => {
    const reservas = await readReservas();

    const index = reservas.findIndex(res => res.id === id);

    if (index === -1) {
        throw new Error("La reserva no existe");
    }

    // Fusionamos los datos antiguos con los nuevos
    reservas[index] = { ...reservas[index], ...datosActualizados };

    await writeReservas(reservas);
    return actualizarReserva;
 

}

//eliminar reserva

const deleteReserva = async (id) => {
    const reservas = await readReservas();
    const nuevasReservas = reservas.filter(res => res.id !== id);

    if (reservas.length === nuevasReservas.length) return false;

    await writeReservas(nuevasReservas);
    return true;
};



module.exports = {
    getAllReservas,
    createReserva,
    updateReserva,
    deleteReserva
}
