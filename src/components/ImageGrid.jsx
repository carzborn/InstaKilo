import ModalImage from "react-modal-image";

const Grid = ({ imageUrl }) => {
  return (
    <>
      <ModalImage small={imageUrl} large={imageUrl} hideDownload />
    </>
  );
};

export default Grid;
