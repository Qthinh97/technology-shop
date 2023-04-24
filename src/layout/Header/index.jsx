import * as S from "./styles";
import Logo from "../../assets/images/logo/Tech-shop.png";
import LogoShop from "../../assets/images/logo/NameShop.png";
import { Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { generatePath } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { loguotAction } from "../../redux/action";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <S.HeaderWrapper>
      <S.IconMain to={generatePath(ROUTES.USER.HOME)}>
        <img src={Logo} alt="logo" style={{ height: "80%" }} />
        <img src={LogoShop} alt="ten shop" style={{ height: "20%" }} />
      </S.IconMain>
      <S.CategoryProduct>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          style={{ marginRight: "4px" }}
        >
          <path
            d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
            fill="#000"
          ></path>
        </svg>
        Danh mục sản phẩm
      </S.CategoryProduct>
      <S.CustomSearchHeader
        placeholder="Nhập tên sản phẩm, từ khóa cần tìm..."
        enterButton="Search"
        size="large"
      />

      <S.CustomModalSearch></S.CustomModalSearch>

      <S.CartShopping>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          style={{ marginRight: "8px" }}
        >
          <path
            d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"
            fill="#000"
          ></path>
        </svg>
        Giỏ hàng
      </S.CartShopping>
      <S.BuildPC>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
        >
          <path
            d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"
            fill="#000"
          ></path>
        </svg>
        Build PC
      </S.BuildPC>
      {userInfo.data.id ? (
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: (
                  <span onClick={() => dispatch(loguotAction())}>Logout</span>
                ),
              },
            ],
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
            >
              <path
                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                fill="#000"
              ></path>
            </svg>
            <div>{userInfo.data.phoneNumber}</div>
          </div>
        </Dropdown>
      ) : (
        <S.Register to={generatePath(ROUTES.LOGIN)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
          >
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
              fill="#000"
            ></path>
          </svg>
          <div>Đăng ký / Đăng nhập</div>
        </S.Register>
      )}
    </S.HeaderWrapper>
  );
}

export default Header;
