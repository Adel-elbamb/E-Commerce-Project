import userModel from './../../../../DB/models/user.model.js';

export const addUser = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        res.json({ message: "User added successfully", user });
    } catch (error) {
        res.status(400).json({ message: "Failed to add user", error: error.message });
    }
};

