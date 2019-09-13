var Country = require('../models/country.model');
function CountryCtrl() {
    //list 
    this.get = function (req, res) {
            var count;
        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;

        var query = Country.find().skip(pageIndex * pageSize).limit(pageSize);
        var count;
        Country.count().exec()
            .then(function (result) {
                count = result;
                return query.exec()
                    .then(function (Country) {
                        var meta = {
                            totalRecords: count,
                            totalPages: Math.ceil(count / pageSize)
                        };
                        var response = {
                            metaData: meta,
                            Country: Country
                        };
                        res.status(200);
                        res.json(response);
                    }).catch(function (error) {
                        res.status(500);
                        res.json({
                            message: "Internal Server Error",
                            status: "500"
                        });
                    });
            })
    };

    //insert
    this.save = function (req, res) {
        console.log(req.body);
        var country = new Country(req.body);
        country.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                    status: "500"
                });
            }
            else {
                res.status(201);
                res.json({
                    message: "saved successfully",
                    status: "201"
                });
            }
        });
    };
    //update
    this.put = function (req, res) {
        var id = req.params.id;
        Country.findByIdAndUpdate(id, req.body, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                    status: "500"
                });
            } else {
                res.status(200);//updated successfully
                res.json({
                    message: "updated successfully",
                    status: "201"
                });
            }
        });
    };
    //delete function
    this.delete = function (req, res) {
        var id = req.params.id;
        Country.findByIdAndRemove(id, function (err, result) {
            if (err) {
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                    status: "500"
                });
            } else {
                res.status(204);//deleted
                res.json({
                    message: "deleted successfully",
                    status: "201"
                });
            }
        });
    };
}
module.exports = new CountryCtrl();