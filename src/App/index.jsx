import "../App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import UserLayout from "../layout/userLayout";
import AdminLayout from "../layout/AdminLayout";
import AccountLayout from "../layout/AccountLayout";

import DashboardPage from "../pages/admin/Dashboard";
import ProductManagementPage from "../pages/admin/ProductManagement";
import CreateProductPage from "../pages/admin/CreateProduct";

import HomePage from "../pages/user/Home";
import DetailPage from "../pages/user/Detail";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProductsByCategoryPage from "../pages/user/ProductsByCategory";
import CartPage from "../pages/user/Cart";
import CheckoutPage from "../pages/user/Checkout";
import BuildPCPage from "../pages/user/BuildPC";
import AccountPage from "../pages/account/InfoAccount";
import OderHistory from "../pages/account/OderHistory";

import { ROUTES } from "../constants/routes";
import { getUserInfoAction } from "../redux/action/";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App" style={{ backgroundColor: "#f4f4f4" }}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
          <Route
            path={ROUTES.ADMIN.PRODUCT_MANAGEMENT}
            element={<ProductManagementPage />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<CreateProductPage />}
          />
        </Route>

        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_BY_CATEGORY}
            element={<ProductsByCategoryPage />}
          />
          <Route path={ROUTES.USER.DETAIL} element={<DetailPage />} />
          <Route path={ROUTES.USER.CART_LIST} element={<CartPage />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.USER.BUILDPC} element={<BuildPCPage />} />
          <Route path={ROUTES.USER.DETAIL} element={<DetailPage />} />
        </Route>
        <Route element={<AccountLayout />}>
          <Route path={ROUTES.ACCOUNT.ACCOUNTINFO} element={<AccountPage />} />
          <Route path={ROUTES.ACCOUNT.ODERHISTORY} element={<OderHistory />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
