import mongoose from "mongoose";
import {connectDB} from "../service/mongoDB.js";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const imageSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    userId: {
        type: [String],
        ref: 'User',
    },
    customCardId: {
        type: String,
        ref: 'CustomCard',
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    type: {
        type: String,
    },
    author: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    public: {
        type: Boolean,
        default: true,
    }
},{versionKey: false});


const Image = connectDB.model('Image', imageSchema);

export default Image;