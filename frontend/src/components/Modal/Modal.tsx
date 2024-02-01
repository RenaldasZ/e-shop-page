import { Box, Button } from "@mui/material";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: Props) {
  const portalElement = document.getElementById("portal");

  if (!portalElement) {
    console.error("The portal element was not found");
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Box className="overlay"></Box>
      <Box className="modal">
        <Button className="modalCloseButton" onClick={closeModal}>
          X
        </Button>
        {children}
      </Box>
    </>,
    portalElement
  );
}
