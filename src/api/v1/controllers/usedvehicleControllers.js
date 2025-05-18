const getAllUsedVehicles = require("../../../services/usedVehiclesSevices");


const getAllusedVehicle = async (req, res) => {
    try {
        const result = await getAllUsedVehicles();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = getAllusedVehicle;