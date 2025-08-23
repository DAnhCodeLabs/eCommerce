import Banner from "../../models/bannerModel.js";

export const addBanner = async (req, res) => {
  try {
    const { title, subTitle, description, startDate, endDate } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !subTitle || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const now = new Date();
    let isActive = true;

    if (endDate && new Date(endDate) < now) {
      isActive = false;
    }

    if (startDate && new Date(startDate) > now) {
      isActive = false;
    }

    const newBanner = new Banner({
      title,
      subTitle,
      description,
      isActive,
      startDate: startDate || now,
      endDate,
      image,
    });

    const savedBanner = await newBanner.save();
    res
      .status(201)
      .json({ message: "Banner added successfully", banner: savedBanner });
  } catch (error) {
    console.error("Error adding banner:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
