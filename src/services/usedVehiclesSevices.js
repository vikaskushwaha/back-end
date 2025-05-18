const vehicle = require('../models/vehicle.model')

const getAllUsedVehicles = async () => {
    let query = { condition: 'Used' }
    try {
        const data = await vehicle.find(query);
        return {
            succes: true,
            data: data,
        }
    }
    catch (error) {
        console.error('Error fetching used vehicles:', error);
        throw new Error('Failed to retrieve used vehicles: ' + error.message);
    }

}

module.exports = getAllUsedVehicles;
