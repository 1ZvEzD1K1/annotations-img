import React, { FC, ReactNode } from "react";
import "./style.scss";

type TWrapper = {
  children: ReactNode;
};

const Wrapper: FC<TWrapper> = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="container">{children}</div>
    </div>
  );
};

export default Wrapper;
