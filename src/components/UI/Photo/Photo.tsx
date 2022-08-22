import React from "react";

import cl from "./photo.module.scss";
import ava from "../../../assets/ava.png";
import Camera from "../Camera/Camera";

const Photo: React.FC<{
  img?: string;
  changePhoto?: boolean;
  width?: number;
  height?: number;
}> = ({ img = ava, changePhoto, width = 70, height = 70 }) => {
  if (!img) img = ava;
  const camera = changePhoto && (
    <div className={cl.camera}>
      <Camera />
    </div>
  );
  return (
    <div
      className={`${cl.photo} ${changePhoto && cl.changePhoto}`}
      style={{ width, height }}
    >
      <img src={img} alt="avatar" />
      {camera}
    </div>
  );
};

export default Photo;
