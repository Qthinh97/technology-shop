import React, { useState } from "react";
import "react-slideshow-image/dist/styles.css";
import * as S from "./styles";

const Slideshow = ({ slideImages }) => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <S.SlideWrapper>
      {slideImages.map((slideImage, index) => (
        <div key={index}>
          <img {...divStyle} src={slideImage.url} alt="" />
        </div>
      ))}
    </S.SlideWrapper>
  );
};

export default Slideshow;
