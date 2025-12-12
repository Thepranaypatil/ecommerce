import Address from "../../models/Address.js";

// ===================================
// 1️⃣ ADD A NEW ADDRESS
// ===================================
// Steps:
// - Take userId + address fields from req.body
// - Validate all fields
// - Create new Address document
// - Save to MongoDB
export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    // Check if all fields exist
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Create address
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// ===================================
// 2️⃣ FETCH ALL ADDRESSES OF A USER
// ===================================
// Steps:
// - Read userId from URL (/address/:userId)
// - Find all addresses for that user
// - Return list
export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// ===================================
// 3️⃣ EDIT AN EXISTING ADDRESS
// ===================================
// Steps:
// - Read userId + addressId from URL
// - Find address that belongs to user
// - Update it with req.body
// - Return updated address
export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId }, // ensures user can edit only their address
      formData,
      { new: true } // return updated address
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// ===================================
// 4️⃣ DELETE AN ADDRESS
// ===================================
// Steps:
// - Read userId + addressId from URL
// - Delete only if address belongs to that user
// - Return success
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
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
  addAddress,
  editAddress,
  fetchAllAddress,
  deleteAddress,
};
