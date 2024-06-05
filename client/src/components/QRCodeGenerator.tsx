import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
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
    <div>
      <h1>QR Code Generator!</h1>
    </div>
  );
};

export default QRCodeGenerator;
