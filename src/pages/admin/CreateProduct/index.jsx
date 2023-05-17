import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, InputNumber, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";

import { ROUTES } from "constants/routes";
import {
  getCategoryAction,
  createProductAction,
  getSeriesAction,
} from "../../../redux/action";

import * as S from "./styles";
import { values } from "json-server-auth";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [categoryId, setCategoryId] = useState("");
  // console.log(
  //   "🚀 ~ file: index.jsx:22 ~ CreateProductPage ~ categoryId:",
  //   categoryId
  // );

  const [createForm] = Form.useForm();

  const { categoryList } = useSelector((state) => state.category);
  const { seriesList } = useSelector((state) => state.series);

  const { createProductData } = useSelector((state) => state.product);

  const initialValues = {
    name: "",
    price: undefined,
    categoryId: undefined,
    content: "",
    images: [],
  };

  useEffect(() => {
    dispatch(getCategoryAction({ page: 1 }));
    // dispatch(getSeriesAction());
  }, []);

  // const convertImageToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  const handleCreateProduct = (values) => {
    const { productValues } = values;
    console.log(
      "🚀 ~ file: index.jsx:46 ~ handleCreateProduct ~ productValues:",
      productValues
    );
    // const newImages = [];
    // for (let i = 0; i < images.length; i++) {
    //   const imgBase64 = await convertImageToBase64(images[i].originFileObj);
    //   await newImages.push({
    //     name: images[i].name,
    //     type: images[i].type,
    //     thumbUrl: images[i].thumbUrl,
    //     url: imgBase64,
    //   });
    // }
    dispatch(
      createProductAction({
        data: productValues,
        callback: () => navigate(ROUTES.ADMIN.PRODUCT_MANAGEMENT),
      })
    );
  };

  const renderSeriesOptions = useMemo(() => {
    return seriesList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [seriesList.data]);

  const renderProductOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Create Product</h3>
        <Button
          type="primary"
          loading={createProductData.load}
          onClick={() => createForm.submit()}
        >
          Create
        </Button>
      </S.TopWrapper>
      <Form
        form={createForm}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => handleCreateProduct(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Select>{renderProductOptions}</Select>
        </Form.Item>
        <Form.Item
          label="Seri"
          name="SeriId"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Select>{renderSeriesOptions}</Select>
        </Form.Item>
        <Space>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Required!" }]}
          >
            <InputNumber
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: 200 }}
            />
          </Form.Item>
          <span>VND</span>
        </Space>
        <Form.Item
          label="Images"
          name="images"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <ReactQuill
            theme="snow"
            onChange={(value) => {
              createForm.setFieldsValue({ content: value });
            }}
          />
        </Form.Item>
      </Form>
    </S.Wrapper>
  );
};

export default CreateProductPage;
