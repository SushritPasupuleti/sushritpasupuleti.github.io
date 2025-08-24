import * as React from "react";
import { Modal, Image } from "@nextui-org/react";

const ImagePopup = ({ visible, setVisible, img }: { visible: boolean, setVisible: (v: boolean) => void, img: string }) => (
  <Modal open={visible} onClose={() => setVisible(false)}>
    <Modal.Body>
      <div onClick={() => setVisible(false)} style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}>
        <Image src={img} alt="Project Image" width={600} />
      </div>
    </Modal.Body>
  </Modal>
);

export default ImagePopup;
