import mongoose from "mongoose"


const categorySchema = await mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})


export const Category = mongoose.model("Category", categorySchema)