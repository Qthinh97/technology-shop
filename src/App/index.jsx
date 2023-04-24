import logo from "../logo.svg";
import "../App.css";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import HomePage from "../pages/user/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProductsByCategoryPage from "../pages/user/ProductsByCategory";
import UserLayout from "../layout/userLayout";
import { ROUTES } from "../constants/routes";
import { getUserInfoAction } from "../redux/action/";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      console.log(
        "🚀 ~ file: index.jsx:24 ~ useEffect ~ tokenData:",
        tokenData
      );
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "#f4f4f4" }}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_BY_CATEGORY}
            element={<ProductsByCategoryPage />}
          />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
