import { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
import moment from "moment";

import { getOrderList } from "../../../redux/action";

const ORDER_STATUS = {
  pending: "Chờ giao hàng",
  shipping: "Đang giao hàng",
  success: "Đã giao hàng",
};

const OrderHistories = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);
  console.log(
    "🚀 ~ file: index.jsx:13 ~ OrderHistories ~ orderList:",
    orderList
  );

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderList({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderDetails.length} sản phẩm`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} đ`,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "address",
      key: "address",
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="gold">{ORDER_STATUS[status]}</Tag>,
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <ul>
            {record.orderDetails.map((item) => (
              <div key={item.id}>
                <S.ProductItem key={item.id}>
                  <S.ImgProduct alt="logo" src={item.img} />
                  <S.NameProduct>{item.name}</S.NameProduct>
                  <S.PriceProduct>
                    {item.price.toLocaleString()}₫
                  </S.PriceProduct>
                </S.ProductItem>
              </div>
            ))}
          </ul>
        ),
      }}
    />
  );
};

export default OrderHistories;
