const models = require("../database/models");
const asyncHandler = require("express-async-handler");

exports.getAllData = asyncHandler(async (req, res, next) => {
    try {
        const users = await models.User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getDataById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await models.User.findOne({ where: { id: id } });

        if (data) {
            // data has been found
            return res.status(200).json({ code: 0, message: 'Data Found...', data });
        }
        // data not found
        return res.status(200).send({ code: 1, message: "Data with the specified ID does not exists", data: null });

    } catch (error) {
        // error message
        return res.status(200).send({ code: 1, message: `${error.message}`, data: null });
    }
});
exports.createData = asyncHandler(async (req, res) => {
    try {
        // success create new data
        const data = await models.User.create(req.body);

        if (data) {
            const io = req.app.get('socketio');
            io.emit('message', data);
            return res.status(201).json({code: 0, message: 'Data successfully added...', data});
        }

        return res.status(200).json({code: 1, message: 'Data failed added...', data});

    } catch (error) {
        // error message
        return res.status(200).json({code: 1, message: `${error.message}`, data: null});
    }
});
exports.updateData = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await models.User.findOne({ where: { id: id } });

        if (data) {

            // update
            const updated = await models.User.update(req.body, {
                where: { id: id }
            });

            if (updated.length) {
                // success update
                const updatedData = await models.User.findOne({ where: { id: id } });
                return res.status(200).json({ code: 0, message: 'Data successfully updated...', data: updatedData });
            }

            return res.status(200).json({ code: 1, message: 'Data failed to update...', data: null });

        }
        // data id not found
        return res.status(200).send({ code: 1, message: "Data with the specified ID does not exists", data: null });

    } catch (error) {
        // error message
        return res.status(200).send({ code: 1, message: `${error.message}`, data: null });
    }
});
exports.deleteData = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await models.User.destroy({ where: { id: id } });

        // console.log(deleted)
        if (deleted) {
            // success delete
            return res.status(200).send({ code: 0, message: 'Data successfully deleted...', data: null });
        }
        // data id not found
        return res.status(200).send({ code: 1, message: "Data with the specified ID does not exists", data: null });

    } catch (error) {
        // error message
        return res.status(200).send({ code: 1, message: `${error.message}`, data: null });
    }
});
