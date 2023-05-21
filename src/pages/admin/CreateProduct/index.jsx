import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, InputNumber, Space, Upload } from "antd";
import ReactQuill from "react-quill";

import { ROUTES } from "constants/routes";
import {
  getCategoryAction,
  createProductAction,
  getSeriesAction,
} from "../../../redux/action";

import * as S from "./styles";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  console.log(
    "🚀 ~ file: index.jsx:22 ~ CreateProductPage ~ categoryId:",
    categoryId
  );

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
    dispatch(getSeriesAction({ categoryId }));
  }, [categoryId]);

  const handleCreateProduct = (values) => {
    dispatch(
      createProductAction({
        data: values,
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
          <Select onChange={(values) => setCategoryId(values)}>
            {renderProductOptions}
          </Select>
        </Form.Item>
        <Form.Item
          label="Series"
          name="seriesId"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Select>{renderSeriesOptions}</Select>
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
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
          label="Specifications"
          name="specifications"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
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
