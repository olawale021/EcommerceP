const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { // Refers to the user who made the order
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products', // using products from productModel
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    },
    orderStatus: {
        type: String,
        enum: ['PENDING','IN PROGRESS', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    },
    paymentMethod: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Orders', orderSchema);
