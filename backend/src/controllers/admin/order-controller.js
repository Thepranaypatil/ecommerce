import Order from "../../models/Order.js";

// ===============================
// 1️⃣ GET ALL ORDERS (ADMIN)
// ===============================
// Admin can see ALL orders from ALL users.
// Steps:
// - Find all orders → Order.find({})
// - If no orders → return "No orders found"
// - Else → return all orders
export const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders, // array of all orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// ===============================
// 2️⃣ GET SINGLE ORDER DETAILS (ADMIN)
// ===============================
// Admin wants to see details of ONE specific order.
// Steps:
// - Read id from URL → req.params.id
// - Find order using Order.findById(id)
// - If no order → return 404
// - Else → return order details
export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params; // order id from URL

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order, // order details
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// ===============================
// 3️⃣ UPDATE ORDER STATUS (ADMIN)
// ===============================
// Admin can change status → Pending, Shipped, Delivered, Cancelled.
// Steps:
// - Read order id → req.params.id
// - Read new status → req.body.orderStatus
// - Check if order exists
// - If exists → update status
// - Send success message
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "order not found" });
    }

    let updateData = { orderStatus };

    // When delivered -> mark payment as paid
    if (orderStatus === "delivered") {
      updateData.paymentStatus = "paid";
    }

    await Order.findByIdAndUpdate(id, updateData);

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      // data: updatedOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error updating order",
    });
  }
};
