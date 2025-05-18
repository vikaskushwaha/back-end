const getManuFaturesServices = require("../../../services/getAllmanufacture")

const getAllmenufactures = async (req, res) => {
    try {
        const manufacturers = await getManuFaturesServices()
        res.status(200).json({
            success: true,
            count: manufacturers.length,
            data: manufacturers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = getAllmenufactures