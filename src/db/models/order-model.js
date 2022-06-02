import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  //주문 추가
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }
  //주문 완료
  //주문 조회
  async findById(_id) {
    const orderList = await Order.findOne({ _id })
      .sort({ createdAt: 1 })
      .populate(["userId", "products.productId"]);
    return orderList;
  }

  //유저별로 주문조회
  async findByuserId(userId) {
    const userOrderList = await Order.find({ userId })
      .sort({ createdAt: 1 })
      .populate(["userId", "products.productId"]);
    return userOrderList;
  }

  //관리자가 모든 주문조회
  async findAll() {
    const orders = await Order.find({})
      .sort({ createdAt: 1 })
      .populate(["userId", "products.productId"]);
    return orders;
  }

  //주문상태변경
  async update(orderId, orderStatus) {
    const query = { _id: orderId };
    const option = { returnOriginal: false };
    const updatedOrder = await User.findOneAndUpdate(
      filter,
      orderStatus,
      option
    );
    return updatedOrder;
  }

  //주문 취소
  async delete(orderId) {
    const result = await Order.deleteOne({ orderId });
    return result;
  }
}

const orderModel = new OrderModel();

export { orderModel };
