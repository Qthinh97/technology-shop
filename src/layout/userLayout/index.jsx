import * as S from "./styles";
import Header from "../Header";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <Header />
      <S.UserLayout>
        <Outlet />
      </S.UserLayout>
    </>
  );
}

export default UserLayout;
