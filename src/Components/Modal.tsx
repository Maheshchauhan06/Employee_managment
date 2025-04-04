import React from "react";
import "./Modal.css";

type Props = {
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="modal_container">
      <div>{children}</div>
    </div>
  );
};

export default Modal;
