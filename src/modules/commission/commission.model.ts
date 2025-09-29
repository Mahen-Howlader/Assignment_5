import { Schema, model } from "mongoose";
import { ICommission } from "./commission.interface";

const commissionSchema = new Schema<ICommission>(
    {
        agent: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["cash-in", "cash-out"],
            required: true,
        },
        commission: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Commission = model<ICommission>("commission", commissionSchema);