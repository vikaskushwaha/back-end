const getAllVehiclesQuery = require("../../../services/getAllvehicle");
const vehicle = require("../../../models/vehicle.model");
const getAllVehicle = async (req, res) => {
    try {
        if (req.query.distinct) {
            const distinctField = req.query.distinct;
            const query = {};

            // Apply any filters to the distinct query
            if (req.query.make) query.make = req.query.make;
            if (req.query.condition) query.condition = req.query.condition;
            if (req.query.minPrice || req.query.maxPrice) {
                query.price = {};
                if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
                if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
            }
            const distinctValues = await vehicle.distinct(distinctField, query);

            return res.status(200).json({
                success: true,
                count: distinctValues.length,
                data: distinctValues.sort()
            });
        }
        const filters = {
            condition: req.query.condition,           // 'New' or 'Used'
            make: req.query.make,                     // Vehicle make
            model: req.query.model,
            vehicleType: req.query.vehicleType,
            fuelType: req.query.fuelType,                         // Vehicle model
            minPrice: req.query.minPrice,             // Minimum price
            maxPrice: req.query.maxPrice,             // Maximum price
            minYear: req.query.minYear,               // Minimum year
            maxYear: req.query.maxYear,               // Maximum year
            bodyType: req.query.bodyType,
            // SUV, Sedan, etc.
            inStock: req.query.inStock === 'true'

        };
        console.log(req.query);

        const result = await getAllVehiclesQuery(filters)
        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = getAllVehicle;