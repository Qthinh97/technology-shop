import * as S from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <Header />
      <S.UserLayout>
        <Outlet />
      </S.UserLayout>
      <Footer />
    </>
  );
}

export default UserLayout;
