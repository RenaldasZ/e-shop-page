import { Box, Button, Typography } from "@mui/material";

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
  handleDeleteProduct: (index: number) => void;
  handleSaveProduct: (index: number) => void;
  index: number;
}

export default function ModalContent({ handleSaveProduct, setIsModalOpen, handleDeleteProduct, index }: Props) {
  return (
    <>
      <Typography color="black" mb={2}>
        Do You Really Wish To Remove The Product?
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteProduct(index);
            setIsModalOpen(false);
          }}
        >
          Remove product
        </Button>
        <Button
          onClick={() => {
            handleSaveProduct(index);
            setIsModalOpen(false);
          }}
          variant="contained"
          color="info"
        >
          Save product
        </Button>
      </Box>
    </>
  );
}
