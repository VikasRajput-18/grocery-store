import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    name: {
        type: String
    },
    role: {
        enum: ["Customer", "Admin", "DeliveryPartner"],
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
})


const customerSchema = new Schema({
    ...userSchema.obj,
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ["Customer"],
        default: "Customer"
    },

    liveLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    address: {
        type: String
    }
});

const deliveryPartnerSchema = await Schema({
    ...userSchema.obj,
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    phone: {
        type: Number, required: true
    },
    role: {
        type: String,
        enum: ["DeliveryPartner"],
        default: "DeliveryPartner"
    },
    liveLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    address: {
        type: String
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    }
})


const adminSchema = await Schema({
    ...userSchema.obj,
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ["Admin"],
        default: "Admin"
    },
    password: {
        type: String,
        required: true
    }
})


export const Customer = mongoose.model("Customer", customerSchema)
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema)
export const Admin = mongoose.model("Admin", adminSchema)