const getAllnewVehiclesServices = require("../../../services/newVehicleList")

const getAllNewVehicles = async (req, res) => {
    try {
        const result = await getAllnewVehiclesServices();
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
module.exports = getAllNewVehicles