import React, { useState } from "react";
import "react-slideshow-image/dist/styles.css";
import * as S from "./styles";

const Slideshow = ({ slideImages }) => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "500px",
  };

  return (
    <S.SlideWrapper>
      {slideImages.map((slideImage, index) => (
        <div key={index}>
          <div
            style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
          ></div>
        </div>
      ))}
    </S.SlideWrapper>
  );
};

export default Slideshow;
