import Product from "../../models/Product.js";

// ==========================================
// 1️⃣ SEARCH PRODUCTS (Keyword Search)
// ==========================================
// Steps:
// - Read keyword from URL
// - Validate it must be a string
// - Create regex for case-insensitive search
// - Search in title, description, category, brand
// - Return matching results
export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Validate keyword
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Create regex for partial + case-insensitive search
    const regEx = new RegExp(keyword, "i");

    // Search query in multiple fields
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    // Fetch search results
    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export default {
  searchProducts,
};
