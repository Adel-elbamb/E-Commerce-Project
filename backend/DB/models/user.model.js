import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    }
});

const UserModel = model("User", userSchema);

export default UserModel;
