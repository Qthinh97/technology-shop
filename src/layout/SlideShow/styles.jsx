import styled from "styled-components";
import { Link, generatePath } from "react-router-dom";
import { Slide } from "react-slideshow-image";

export const SlideDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

export const SlideSpan = styled.span`
  padding: 20px;
  font-size: 20px;
  background: #efefef;
  text-align: center;
`;

export const SlideWrapper = styled(Slide)`
  width: 100%;
  height: 500px;
`;
