const inquiryService = require('../../../services/inquiryService');

/**
 * Submit a new inquiry
 * @route POST /api/v1/inquiries
 * @access Public
 */
const submitInquiry = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        console.log(req.body);


        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, subject, and message are required'
            });
        }

        // Create inquiry data object
        const inquiryData = {
            name,
            email,
            phone: phone || '',
            subject,
            message,
            createdBy: req.user ? req.user.id : null
        };

        // Use service layer to create the inquiry in database
        const result = await inquiryService.createInquiry(inquiryData);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Thank you! Your inquiry has been submitted successfully.',
            data: {
                id: result.inquiry._id,
                name: result.inquiry.name,
                email: result.inquiry.email,
                subject: result.inquiry.subject,
                createdAt: result.inquiry.createdAt
            }
        });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while submitting your inquiry. Please try again.'
        });
    }
};

module.exports = {
    submitInquiry
};