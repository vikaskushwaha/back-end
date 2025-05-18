const vehicle = require('../models/vehicle.model')

const getAllnewVehiclesServices = async () => {
    let query = { condition: 'New' }
    try {
        const data = await vehicle.find(query);
        return {
            succes: true,
            data: data,
        }
    }
    catch (error) {
        console.error('Error fetching new vehicles:', error);
        throw new Error('Failed to retrieve new vehicles: ' + error.message);
    }

}

module.exports = getAllnewVehiclesServices;
