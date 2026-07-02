const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      minlength: [1, "Text must be at least 1 character long"],
      maxlength: [1000, "Text must be less than 1000 characters long"],
      trim: true,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Compound Index
noteSchema.index({
  application: 1,
  createdAt: -1,
});

module.exports = model("Note", noteSchema);
