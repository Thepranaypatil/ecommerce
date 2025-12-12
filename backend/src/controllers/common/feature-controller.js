import Feature from "../../models/Feature.js";

// ==========================================
// 1️⃣ ADD FEATURE IMAGE
// ==========================================
// Steps:
// - Read image from request body
// - Create new Feature document
// - Save it to database
// - Return success response
export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    // Step 1: Log image (optional)
    console.log(image, "image");

    // Step 2: Create new feature image document
    const featureImages = new Feature({
      image,
    });

    // Step 3: Save to database
    await featureImages.save();

    // Step 4: Send response
    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);

    // Error response
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// ==========================================
// 2️⃣ GET ALL FEATURE IMAGES
// ==========================================
// Steps:
// - Fetch all images from database
// - Return them in response
export const getFeatureImages = async (req, res) => {
  try {
    // Step 1: Fetch all feature images
    const images = await Feature.find({});

    // Step 2: Send response
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);

    // Error response
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export default {
  addFeatureImage,
  getFeatureImages,
};
