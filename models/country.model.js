var mongoose = require('mongoose');

var countryModel = mongoose.model("Countries", {
    name: { type: String, required: true },
    code: {type : String, required:true},
    created: { type: Date, require:true}
});

module.exports = countryModel;