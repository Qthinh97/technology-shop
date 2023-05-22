import * as S from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../constants/routes";

function AccountLayout(props) {
  const accessToken = localStorage.getItem("accessToken");

  const { userInfo } = useSelector((state) => state.auth);

  const { pathname } = useLocation();
  const SIDEBAR_ITEMS = [
    {
      title: "Thông tin tài khoản",
      path: ROUTES.ACCOUNT.ACCOUNTINFO,
      icon: <UserOutlined style={{ fontSize: 18, paddingRight: 8 }} />,
    },
    {
      title: "Quản Lý Đơn hàng",
      path: ROUTES.ACCOUNT.ODERHISTORY,
      icon: <FileDoneOutlined style={{ fontSize: 18, paddingRight: 8 }} />,
    },
  ];

  const renderSidebarItem = () => {
    return SIDEBAR_ITEMS.map((item, index) => (
      <S.sidebarItem key={index} to={item.path} active={pathname === item.path}>
        <div>
          {item.icon}
          {item.title}
        </div>
      </S.sidebarItem>
    ));
  };

  if (!accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <Header />
      <S.AccountLayout>
        <S.AccountLayoutWrapper>
          <S.SidebarAccount>
            <S.HeaderSidebar>
              <UserOutlined style={{ fontSize: 30 }} />
              <div className="user_info">
                <h6>Tài khoản của</h6>
                <h5>{userInfo.data.name}</h5>
              </div>
            </S.HeaderSidebar>
            <div>{renderSidebarItem()}</div>
          </S.SidebarAccount>
          <Outlet />
        </S.AccountLayoutWrapper>
      </S.AccountLayout>
      <Footer />
    </>
  );
}

export default AccountLayout;
