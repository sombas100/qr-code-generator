import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setbgColor] = useState<string>("#ffffff");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleChangeFgColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFgColor(event.target.value);
  };

  const handleChangebgColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setbgColor(event.target.value);
  };

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const pngUrl = canvas
          .toDataURL("image/pmg")
          .replace("image/png", "image/octet-stream");
        let downLoadLink = document.createElement("a");
        downLoadLink.href = pngUrl;
        downLoadLink.download = "qr_code.png";
        document.body.appendChild(downLoadLink);
        downLoadLink.click();
        document.body.removeChild(downLoadLink);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ECFFDC",
        padding: "12px 20px 28px 20px",
        width: "800px",
        height: "750px",
      }}
    >
      <h1>QR Code Generator</h1>
      <p>Create your own QR Code in seconds</p>
      <div>
        <QRCode
          fgColor={fgColor}
          bgColor={bgColor}
          size={180}
          value={text}
          style={{ paddingTop: "10px" }}
        />
      </div>
      <div style={{ marginTop: "8px" }}>
        <label>
          Foreground Color:
          <input
            style={{ cursor: "pointer", marginLeft: "9px" }}
            type="color"
            value={fgColor}
            onChange={handleChangeFgColor}
          />
        </label>
      </div>
      <div style={{ marginTop: "9px" }}>
        <label>
          Background Color:
          <input
            style={{ cursor: "pointer", marginLeft: "9px" }}
            type="color"
            value={bgColor}
            onChange={handleChangebgColor}
          />
        </label>
      </div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter URL"
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
        }}
      />

      <button
        onClick={handleDownload}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          marginLeft: "7px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        Generate QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
