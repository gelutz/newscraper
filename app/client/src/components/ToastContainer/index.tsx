import React from "react";

import { ToastMessage } from "../../hooks/toast";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  messages.forEach((element) => {
    console.log(element);
  });
  return <Container></Container>;
};
export default ToastContainer;
