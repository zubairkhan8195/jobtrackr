const { Schema, model } = require("mongoose");

const applicationSchema = new Schema(
{
    company: {
        type: String,
        required: [true, "Company is required"],
        trim: true,
        minlength: [1, "Company name is required"],
        maxlength: [100, "Company name must not exceed 100 characters"],
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true,
        minlength: [1, "Position is required"],
        maxlength: [100, "Position must not exceed 100 characters"],
    },
    status: {
        type: String,
        enum: [
            "applied",
            "interview",
            "offer",
            "rejected",
            "accepted",
        ],
        default: "applied",
    },
    jobUrl: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    salary: {
        type: Number,
        min: [0, "Salary cannot be negative"],
    },
    source: {
        type: String,
        enum: [
            "linkedin",
            "referral",
            "company-site",
            "other",
        ],
        default: "other",
    },
    appliedDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, 
{
    timestamps: true,
}
);

// Compound Index
applicationSchema.index({
    user: 1,
    status: 1,
    appliedDate: -1,
  });

module.exports = model("Application", applicationSchema);
