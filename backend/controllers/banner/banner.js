import Banner from "../../models/Banner.js";

export const addBanner = async (req, res) => {
  try {
    const { title, subTitle, description, isActive, startDate, endDate } =
      req.body;
    const image = req.file ? req.file.path : null;
    if (!title || !subTitle || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBanner = new Banner({
      title,
      subTitle,
      description,
      isActive,
      startDate,
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
