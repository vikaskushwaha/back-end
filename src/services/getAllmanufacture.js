const Vehicle = require("../models/vehicle.model")


const getManuFaturesServices = async () => {
    try {

        const manufacturers = await Vehicle.distinct('make');
        return manufacturers.sort();

    } catch (error) {
        console.error('Error fetching manufacturers:', error);
        throw new Error('Failed to retrieve manufacturers');
    }
}

module.exports = getManuFaturesServices