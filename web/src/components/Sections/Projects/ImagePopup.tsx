import * as React from "react";
import { useTerminalTheme, mono } from "../../../terminal-theme";

const ImagePopup = ({ visible, setVisible, img }: { visible: boolean, setVisible: (v: boolean) => void, img: string }) => {
  const { c } = useTerminalTheme();
  if (!visible) return null;
  return (
    <div
      onClick={() => setVisible(false)}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div style={{ border: `1px solid ${c.border}`, borderRadius: "4px", overflow: "hidden", maxWidth: "90vw", maxHeight: "90vh" }}>
        <img src={img} alt="Project Image" style={{ maxWidth: "90vw", maxHeight: "90vh", display: "block" }} />
      </div>
    </div>
  );
};

export default ImagePopup;
