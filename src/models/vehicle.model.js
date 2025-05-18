const mongoose = require('mongoose');

// Create a comprehensive vehicle schema based on Figma design
const vehicleSchema = new mongoose.Schema({
    // Basic information - what people search for most
    make: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    model: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    year: {
        type: Number,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        index: true
    },

    // Vehicle classification
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Used', 'Certified Pre-Owned'],
        default: 'New',
        index: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['SUV', 'Sedan', 'Truck', 'Coupe', 'Convertible', 'Hatchback', 'Van', 'Wagon', 'Other'],
        index: true
    },

    // Performance & specifications
    mileage: {
        type: Number,
        required: true,
        index: true
    },
    transmission: {
        type: String,
        required: true,
        enum: ['Automatic', 'Manual', 'CVT', 'Other']
    },
    fuelType: {
        type: String,
        required: true,
        index: true
    },
    engine: {
        type: String,
        required: true
    },
    horsepower: {
        type: Number
    },
    drivetrain: {
        type: String,
        enum: ['FWD', 'RWD', 'AWD', '4WD', 'Other']
    },
    fuelEconomy: {
        city: Number,
        highway: Number
    },

    // Appearance
    exteriorColor: {
        type: String,
        required: true
    },
    interiorColor: {
        type: String,
        required: true
    },

    // Additional details
    description: {
        type: String,
        required: true
    },
    features: [String],

    // Dealership info
    vin: {
        type: String,
        unique: true
    },
    stockNumber: {
        type: String
    },

    // Images
    images: [String],
    mainImage: {
        type: String
    },

    // Status flags
    inStock: {
        type: Boolean,
        default: true,
        index: true
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },

    // Special flags for UI badges
    specialOffer: {
        type: Boolean,
        default: false
    },
    lowMileage: {
        type: Boolean,
        default: false
    },
    greatPrice: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt
});

// A simple method to get the full name of a vehicle
vehicleSchema.virtual('fullName').get(function () {
    return `${this.year} ${this.make} ${this.model}`;
});

// Create indexes for common queries
vehicleSchema.index({ make: 1, model: 1, year: 1 });
vehicleSchema.index({ price: 1, condition: 1 });
vehicleSchema.index({ isFeatured: 1, inStock: 1 });

// Create the model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;