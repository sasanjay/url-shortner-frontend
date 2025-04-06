// App.jsx
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { nanoid } from "nanoid";  // Import nanoid

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleShorten = () => {
    if (!longUrl.trim()) {
      alert("Please enter a URL!");
      return;
    }
    // Generate a 7-character random ID
    const randomStr = nanoid(7);
    const short = `https://sho.rt/${randomStr}`;
    setShortUrl(short);
    setShowQR(true);
  };

  const handleReset = () => {
    setLongUrl("");
    setShortUrl("");
    setShowQR(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">URL Shortener</h1>
        <input
          type="url"
          required
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your long URL..."
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleShorten}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-all mb-4"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="text-center">
            <p className="text-gray-700 mb-2">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-words"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {showQR && (
          <div className="mt-6 flex justify-center">
            <QRCode value={shortUrl} size={128} />
          </div>
        )}

        {(shortUrl || showQR) && (
          <button
            onClick={handleReset}
            className="w-full bg-red-500 text-white py-2 mt-6 rounded-xl hover:bg-red-600 transition-all"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
