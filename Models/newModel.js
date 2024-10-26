const mongoose = require('mongoose');

const cityWeatherSchema = new mongoose.Schema({
    city: { type: String, },
    temp: [{ type: Number, required:true }],
    min_temp: { type: Number },
    max_temp: { type: Number },
    map_val: { type: String }
});

const weatherSchema = new mongoose.Schema({
    date: { type: String },
    data: {
        type: Map,
        of: cityWeatherSchema
    }
});

const Weather = mongoose.models.Weather || mongoose.model('Weather', weatherSchema);

module.exports = Weather;