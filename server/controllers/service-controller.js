const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response) {
            res.status(404).json({msg: "No services found"}); // handle the case where no document was found
        }
        res.status(200).json({msg: response});
        
    } catch (error) {
        console.log(`service ${error}`);
    }
};

module.exports = services;