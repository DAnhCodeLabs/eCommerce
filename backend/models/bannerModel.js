import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now, required: true },
    endDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !v || v > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

/**
 * Hàm auto cập nhật trạng thái banner
 * - Nếu chưa tới startDate  → inactive
 * - Nếu đang trong khoảng   → active
 * - Nếu quá endDate         → inactive
 */
export async function autoUpdateBannerStatus() {
  const now = new Date();

  try {
    // Active những banner đủ điều kiện
    await Banner.updateMany(
      {
        startDate: { $lte: now },
        $or: [{ endDate: null }, { endDate: { $gt: now } }],
        isActive: false,
      },
      { isActive: true }
    );

    // Inactive những banner đã hết hạn hoặc chưa tới ngày bắt đầu
    await Banner.updateMany(
      {
        $or: [
          { endDate: { $lte: now } }, // hết hạn
          { startDate: { $gt: now } }, // chưa tới ngày
        ],
        isActive: true,
      },
      { isActive: false }
    );
  } catch (err) {
    console.error("Error auto updating banner status:", err);
  }
}

// Chạy mỗi phút
setInterval(autoUpdateBannerStatus, 60 * 1000);

export { Banner };        // ✅ Named export
export default Banner;    // vẫn giữ default export cho tương thích
