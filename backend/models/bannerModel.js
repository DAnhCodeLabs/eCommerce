import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !v || v > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bannerSchema.pre("save", function (next) {
  const now = new Date();
  this.isActive = true;

  if (this.endDate && now > this.endDate) {
    this.isActive = false;
  }
  if (this.startDate && now < this.startDate) {
    this.isActive = false;
  }

  next();
});

async function updateBannerStatus() {
  const now = new Date();

  await Banner.updateMany(
    {
      startDate: { $lte: now },
      endDate: { $gt: now },
      isActive: false,
    },
    { isActive: true }
  );

  await Banner.updateMany(
    {
      endDate: { $lte: now },
      isActive: true,
    },
    { isActive: false }
  );
}

setInterval(updateBannerStatus, 60000);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
