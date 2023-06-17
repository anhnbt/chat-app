const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.status(200).json({author: 'AnhNBT', contact: 'anhnbt.it@gmail.com', company: 'BITSCO', description: 'API'});
});
