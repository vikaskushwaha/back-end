const vehicle = require('../models/vehicle.model');

const getAllVehiclesQuery = async (filters = {}) => {
    try {
        const query = {}

        if (filters.condition) {
            query.condition = filters.condition;
        }
        if (filters.make) {
            query.make = { $regex: filters.make, $options: 'i' };
        }
        if (filters.model) {
            query.model = { $regex: filters.model, $options: 'i' };
        }
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
            if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
        }
        if (filters.minYear || filters.maxYear) {
            query.year = {};
            if (filters.minYear) query.year.$gte = Number(filters.minYear);
            if (filters.maxYear) query.year.$lte = Number(filters.maxYear);
        }
        if (filters.bodyType) {
            query.bodyType = filters.bodyType;
        }
        if (filters.vehicleType) {
            query.vehicleType = filters.vehicleType;
        }
        if (filters.fuelType) {
            query.fuelType = filters.fuelType
        }
        // if (filters.inStock !== undefined) {
        //     query.inStock = filters.inStock;
        // }
        const data = await vehicle.find(query)


        return {
            success: true,
            vehclesList: data,
        }


    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw new Error('Failed to retrieve vehicles: ' + error.message);
    }
}

module.exports = getAllVehiclesQuery;