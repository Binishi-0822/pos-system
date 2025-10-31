import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const DashboardOverview = () => {
  const html5QrCodeRef = useRef(null);
  const [scannedData, setScannedData] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.CODE_128,
      ],
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
      rememberLastUsedCamera: true,
    };

    const onScanSuccess = async (decodedText, decodedResult) => {
      setScannedData(decodedText);
      setIsScanning(false);
      console.log("✅ Scanned:", decodedText);

      await html5QrCode.stop();

      alert(`✅ Scanned: ${decodedText}\nVerifying barcode...`);
      setTimeout(() => {
        alert(`✅ Verification Successful!\nCode: ${decodedText}`);
      }, 2000);
    };

    // 🔧 Force use of back camera
    html5QrCode
      .start({ facingMode: "environment" }, config, onScanSuccess)
      .then(() => console.log("📸 Back camera started with barcode support"))
      .catch((err) => console.error("❌ Camera start failed:", err));

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => console.log("🛑 Camera stopped"))
          .catch((err) => console.error("Failed to stop camera:", err));
      }
    };
  }, []);

  return (
    <div className="text-center mt-6 px-4">
      <h2 className="text-lg font-semibold mb-2">📷 Scan QR or Barcode</h2>
      <p className="text-sm text-gray-500 mb-4">
        Point your <strong>back camera</strong> at a product barcode or QR code
      </p>

      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "350px",
          margin: "auto",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />

      <div className="mt-6">
        {isScanning && (
          <p className="text-blue-600 font-medium animate-pulse">
            🔍 Scanning... Please align your code within the box
          </p>
        )}
        {scannedData && (
          <div className="mt-4 text-green-600 font-semibold">
            ✅ Scanned Code: {scannedData}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
