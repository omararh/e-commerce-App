const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{16}$/.test(v);
            },
            message: '{VALUE} is not a valid card number'
        }
    },
    expiryDate: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{2}\/\d{2}$/.test(v);
            },
            message: '{VALUE} is not a valid expiry date'
        }
    },
    cvv: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{3}$/.test(v);
            },
            message: '{VALUE} is not a valid CVV'
        }
    }
});

module.exports = mongoose.model('Cart', cartSchema);