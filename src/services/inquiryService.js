const Inquiry = require('../models/inquiry.model');

/**
 * Create a new inquiry in the database
 * @param {Object} inquiryData - The inquiry data to create
 * @returns {Promise<Object>} - Result with success status and inquiry or error message
 */
const createInquiry = async (inquiryData) => {
    try {
        // Validate essential fields
        if (!inquiryData.name || !inquiryData.email || !inquiryData.subject || !inquiryData.message) {
            return {
                success: false,
                message: 'Missing required inquiry fields'
            };
        }

        // Create new inquiry document
        const inquiry = new Inquiry({
            name: inquiryData.name,
            email: inquiryData.email.toLowerCase(),
            phone: inquiryData.phone || '',
            subject: inquiryData.subject,
            message: inquiryData.message,
            vehicleId: inquiryData.vehicleId || null,
            createdBy: inquiryData.createdBy || null,
            status: 'new'
        });

        // Save to database
        await inquiry.save();

        return {
            success: true,
            inquiry
        };
    } catch (error) {
        console.error('Database error creating inquiry:', error);
        return {
            success: false,
            message: error.message || 'Error creating inquiry'
        };
    }
};

module.exports = {
    createInquiry
};