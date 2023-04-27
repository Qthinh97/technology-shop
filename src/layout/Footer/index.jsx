import * as S from "./styles";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";

import { getCategoryAction } from "../../redux/action";
import { ROUTES } from "../../constants/routes";

function Footer() {
  return (
    <S.FooterWrapper>
      <S.PolicyFooter></S.PolicyFooter>
    </S.FooterWrapper>
  );
}

export default Footer;
