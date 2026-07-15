<div align="center">
<h1>CertForge</h1>

[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Language-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<a href="https://phlaster.github.io/CertForge/" target="_blank">
  <img src="public/assets/blake_cert.png" alt="CertForge Screenshot" width="800px" />
</a>
</div>
CertForge is an elegant, browser-based tool for creating beautifully styled Authenticity Certificates for pieces of graphical art. 

---

## Features

*   **Editable Fields:** Click-to-edit text for artist name, artwork title, and custom certificate details.
*   **Artwork Integration:** Upload images (including HEIC support) directly into the certificate frame.
*   **Custom Palettes:** Choose from 8 carefully curated color palettes to match the artwork's aesthetic.
*   **Paper Texture:** Toggle and regenerate a procedural canvas-based paper grain for an authentic physical feel.
*   **QR Code Integration:** Attach a scannable QR code linking to the artwork's provenance or website.
*   **PDF Export:** Generate high-quality, print-ready A4 landscape PDFs.

## Tech Stack

*   **Vite:** Fast development and build tooling.
*   **Vanilla JS/CSS:** No heavy frameworks, just standard web technologies.
*   **Libraries (lazy-loaded):**
    *   [`qrcode`](https://www.npmjs.com/package/qrcode) for QR code generation.
    *   [`html2pdf.js`](https://www.npmjs.com/package/html2pdf.js) for client-side PDF exporting.
    *   [`heic2any`](https://www.npmjs.com/package/heic2any) for Apple HEIC image conversion support.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```