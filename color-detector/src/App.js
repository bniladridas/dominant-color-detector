import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    setImage(file);
    setError("");
    setColor("");
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/upload";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setColor(response.data.hex_color);
    } catch (err) {
      console.error("Error uploading image:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
        setError(`Failed to process the image: ${err.response.data.message || err.response.data}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("Failed to process the image. No response from the server.");
      } else {
        console.error("Error setting up request:", err.message);
        setError(`Failed to process the image: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Define styles for responsiveness
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      padding: "0 20px", // Add padding for smaller devices
    },
    logo: {
      width: "100px",
      marginBottom: "20px",
      animation: "glow 1.5s infinite alternate",
    },
    link: {
      textAlign: "center",
      marginBottom: "20px",
    },
    qrCode: {
      width: "100px",
      marginBottom: "20px",
    },
    content: {
      textAlign: "center",
      margin: "50px",
    },
    fileInput: {
      margin: "10px 0",
    },
    uploadButton: {
      marginLeft: "10px",
    },
    error: {
      color: "red",
    },
    colorInfo: {
      marginTop: "20px",
    },
    colorBox: {
      width: "100px",
      height: "100px",
      margin: "20px auto",
      border: "1px solid #000",
    },
    colorList: {
      listStyleType: "none",
      padding: 0,
    },
    footer: {
      marginTop: "50px",
    },
  };

  return (
    <div style={styles.container}>
      <img src="/drago.png" alt="Drago" style={styles.logo} />
      <p style={styles.link}>
        Try our <a href="https://dragon-ai-assistant.vercel.app" target="_blank" rel="noopener noreferrer">AI Assistant</a>
      </p>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://dragon-ai-assistant.vercel.app" alt="QR Code" style={styles.qrCode} />
      <div style={styles.content}>
        <h1>Dominant Color Detector</h1>
        <input type="file" onChange={handleImageChange} style={styles.fileInput} />
        <button
          type="button"
          onClick={handleUpload}
          style={styles.uploadButton}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        {color && (
          <div style={styles.colorInfo}>
            <p>Dominant Color: {color}</p>
            <div style={{ ...styles.colorBox, backgroundColor: color }} />
            <p>Color Information:</p>
            <ul style={styles.colorList}>
              <li>Hex: {color}</li>
              <li>RGB: {hexToRgb(color)}</li>
              <li>HSL: {hexToHsl(color)}</li>
            </ul>
          </div>
        )}
        <footer style={styles.footer}>
          <p>Helping designers, artists, and developers to identify and use colors effectively.</p>
        </footer>
      </div>
      <style>
        {`
          @keyframes glow {
            from {
              box-shadow: 0 0 5px #fff;
            }
            to {
              box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff;
            }
          }
        `}
      </style>
    </div>
  );

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function hexToHsl(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16) / 255;
      g = parseInt(hex.slice(3, 5), 16) / 255;
      b = parseInt(hex.slice(5, 7), 16) / 255;
    }
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return `hsl(${(h * 360).toFixed(1)}, ${(s * 100).toFixed(1)}%, ${(l * 100).toFixed(1)}%)`;
  }
}

export default App;