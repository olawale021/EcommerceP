const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
},  {
    timestamps: true
    }
)
// Create the 'Category' model based on the schema
const Category = mongoose.model('Category', categorySchema);
// Export the 'Category' model for use in other parts of the application
module.exports = Category;
