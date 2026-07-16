import './style.css';

// ============================================================
//  PAPER TEXTURE GENERATOR (Canvas to PNG for perfect PDF export)
// ============================================================
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function generatePaperTexture() {
    const size = 1024; // High resolution
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = size;
    noiseCanvas.height = size;
    const ctx = noiseCanvas.getContext('2d');

    const color = getComputedStyle(document.documentElement).getPropertyValue('--frame-mid').trim();
    const rgb = hexToRgb(color) || {
        r: 107,
        g: 92,
        b: 74
    };

    ctx.clearRect(0, 0, size, size);

    // Enable browser's bilinear interpolation to smooth out the noise naturally
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Apply a slight blur to all layers to ensure it looks like soft paper grain
    ctx.filter = 'blur(1.5px)';

    // Vary octaves on each switch (3 to 5 layers of detail)
    const octaves = 1 + Math.floor(Math.random() * 5);
    const baseFreq = 100; // Starting frequency

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    for (let o = 0; o < octaves; o++) {
        // Double the frequency (detail) for each octave
        const freq = baseFreq * Math.pow(2, o);
        tempCanvas.width = freq;
        tempCanvas.height = freq;

        const imgData = tempCtx.createImageData(freq, freq);
        const d = imgData.data;

        const octaveAlpha = 0.2; //(0.5 / octaves) * (1 - (0.1 * o)); // Higher frequencies get slightly less opacity so the fine grain doesn't overpower

        // Generate pure random pixel noise at this frequency
        for (let i = 0; i < d.length; i += 4) {
            const val = Math.random();
            d[i] = rgb.r;
            d[i + 1] = rgb.g;
            d[i + 2] = rgb.b;
            d[i + 3] = val * 255 * octaveAlpha;
        }
        tempCtx.putImageData(imgData, 0, 0);

        // Draw the small noise canvas onto the 1024px main canvas.
        // The browser interpolates and smooths it automatically, removing all blocky edges.
        ctx.drawImage(tempCanvas, 0, 0, freq, freq, 0, 0, size, size);
    }

    // Reset filter
    ctx.filter = 'none';

    const textureDiv = document.getElementById('paperTexture');
    textureDiv.style.backgroundImage = `url(${noiseCanvas.toDataURL()})`;
}

generatePaperTexture();

// ============================================================
//  TEXTURE TOGGLE LOGIC
// ============================================================
const textureCheck = document.getElementById('textureCheck');
const certElement = document.getElementById('certificate');
textureCheck.addEventListener('change', () => {
    if (textureCheck.checked) {
        certElement.classList.remove('no-texture');
    } else {
        certElement.classList.add('no-texture');
    }
});

// ============================================================
//  REGENERATE TEXTURE ON TEXT CLICK
// ============================================================
const regenTextureText = document.getElementById('regenTextureText');
if (regenTextureText) {
    regenTextureText.addEventListener('click', () => {
        generatePaperTexture();
    });
}

// ============================================================
//  PALETTE PICKER LOGIC
// ============================================================
const palettes = {
    1: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#f0f0f0',
        '--bg-cert-warm': '#e5e5e5',
        '--frame-dark': '#4a4a4a',
        '--frame-mid': '#6e6e6e',
        '--frame-light': '#a8a8a8',
        '--text-primary': '#2a2a2a',
        '--text-secondary': '#404040',
        '--text-muted': '#6e6e6e',
        '--edit-hover': 'rgba(110, 110, 110, 0.15)',
        '--edit-focus': 'rgba(110, 110, 110, 0.25)'
    },
    2: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#f7f1e3',
        '--bg-cert-warm': '#f1e7d2',
        '--frame-dark': '#6b5d4a',
        '--frame-mid': '#8b7355',
        '--frame-light': '#c4a77d',
        '--text-primary': '#3d342a',
        '--text-secondary': '#5a4a3a',
        '--text-muted': '#8b7355',
        '--edit-hover': 'rgba(196, 167, 125, 0.15)',
        '--edit-focus': 'rgba(196, 167, 125, 0.25)'
    },
    3: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#f2f6ef',
        '--bg-cert-warm': '#e4ede0',
        '--frame-dark': '#4d6147',
        '--frame-mid': '#6f8b6a',
        '--frame-light': '#a3bd9e',
        '--text-primary': '#2d3a2a',
        '--text-secondary': '#455a40',
        '--text-muted': '#6f8b6a',
        '--edit-hover': 'rgba(111, 139, 106, 0.15)',
        '--edit-focus': 'rgba(111, 139, 106, 0.25)'
    },
    4: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#f9f0f1',
        '--bg-cert-warm': '#f0dde0',
        '--frame-dark': '#7a525a',
        '--frame-mid': '#a87882',
        '--frame-light': '#d4adb4',
        '--text-primary': '#42272c',
        '--text-secondary': '#6b404a',
        '--text-muted': '#a87882',
        '--edit-hover': 'rgba(168, 120, 130, 0.15)',
        '--edit-focus': 'rgba(168, 120, 130, 0.25)'
    },
    5: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#eef0f6',
        '--bg-cert-warm': '#e0e3ec',
        '--frame-dark': '#4a526a',
        '--frame-mid': '#6a7591',
        '--frame-light': '#a0aac0',
        '--text-primary': '#2a2e3d',
        '--text-secondary': '#404a60',
        '--text-muted': '#6a7591',
        '--edit-hover': 'rgba(106, 117, 145, 0.15)',
        '--edit-focus': 'rgba(106, 117, 145, 0.25)'
    },
    6: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#f5f1fa',
        '--bg-cert-warm': '#ebe3f2',
        '--frame-dark': '#5a4b6e',
        '--frame-mid': '#8270a0',
        '--frame-light': '#b8a8ce',
        '--text-primary': '#332a44',
        '--text-secondary': '#4d4063',
        '--text-muted': '#8270a0',
        '--edit-hover': 'rgba(130, 112, 160, 0.15)',
        '--edit-focus': 'rgba(130, 112, 160, 0.25)'
    },
    7: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#f6ece5',
        '--bg-cert-warm': '#eddfd4',
        '--frame-dark': '#725142',
        '--frame-mid': '#a17558',
        '--frame-light': '#d4a98e',
        '--text-primary': '#402a20',
        '--text-secondary': '#624230',
        '--text-muted': '#a17558',
        '--edit-hover': 'rgba(161, 117, 88, 0.15)',
        '--edit-focus': 'rgba(161, 117, 88, 0.25)'
    },
    8: {
        '--bg-page': '#dbdbdb',
        '--bg-cert': '#ecf6f5',
        '--bg-cert-warm': '#d8ecea',
        '--frame-dark': '#3a6b68',
        '--frame-mid': '#588f8c',
        '--frame-light': '#8fbab7',
        '--text-primary': '#1f3836',
        '--text-secondary': '#2d4e4b',
        '--text-muted': '#588f8c',
        '--edit-hover': 'rgba(88, 143, 140, 0.15)',
        '--edit-focus': 'rgba(88, 143, 140, 0.25)'
    }
};

document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const palette = palettes[swatch.dataset.palette];
        for (const [key, value] of Object.entries(palette)) {
            document.documentElement.style.setProperty(key, value);
        }
        generateQR(currentQRUrl);
    });
});

// ============================================================
//  PLACEHOLDER LOGIC
// ============================================================
function applyPlaceholderBehavior(el) {
    const placeholder = el.getAttribute('data-placeholder');
    if (!placeholder) return;

    // Initial set
    if (el.innerText.trim() === '') {
        el.innerText = placeholder;
        el.classList.add('placeholder-text');
    }

    el.addEventListener('focus', () => {
        if (el.classList.contains('placeholder-text')) {
            el.innerText = '';
            el.classList.remove('placeholder-text');
        }
    });

    el.addEventListener('blur', () => {
        if (el.innerText.trim() === '') {
            el.innerText = placeholder;
            el.classList.add('placeholder-text');
        }
    });

    // Prevent line breaks
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
    });

    // Strip formatting on paste
    el.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        if (el.classList.contains('placeholder-text')) {
            el.innerText = '';
            el.classList.remove('placeholder-text');
        }
        document.execCommand('insertText', false, text);
    });
}

document.querySelectorAll('[data-placeholder]').forEach(applyPlaceholderBehavior);

// ============================================================
//  ARTIST NAME LOGIC
// ============================================================
const artistElement = document.querySelector('.by-line .artist');
const byLineElement = document.querySelector('.by-line');

function checkArtistName() {
    if (artistElement.classList.contains('placeholder-text')) {
        byLineElement.classList.add('empty-artist');
    } else {
        byLineElement.classList.remove('empty-artist');
    }
}

artistElement.addEventListener('blur', checkArtistName);
artistElement.addEventListener('input', checkArtistName);
checkArtistName();

// ============================================================
//  META LIST LOGIC
// ============================================================
const metaList = document.getElementById('metaList');
const metaAddBtn = document.getElementById('metaAddBtn');

function updateMetaAddBtn() {
    const rows = metaList.querySelectorAll('.meta-row').length;
    metaAddBtn.style.display = rows >= 5 ? 'none' : 'block';
}

function addMetaRow() {
    if (metaList.querySelectorAll('.meta-row').length >= 5) return;

    const row = document.createElement('div');
    row.className = 'meta-row';

    const delBtn = document.createElement('button');
    delBtn.className = 'meta-delete-btn';
    delBtn.innerHTML = '×';
    delBtn.onclick = function() {
        removeMetaRow(this);
    };

    const dt = document.createElement('dt');
    dt.contentEditable = true;
    dt.spellcheck = false;
    dt.setAttribute('data-placeholder', 'New detail');

    const dd = document.createElement('dd');
    dd.contentEditable = true;
    dd.spellcheck = false;
    dd.setAttribute('data-placeholder', 'enter value');

    row.appendChild(delBtn);
    row.appendChild(dt);
    row.appendChild(dd);

    metaList.appendChild(row);

    // Apply placeholder behavior to new elements
    applyPlaceholderBehavior(dt);
    applyPlaceholderBehavior(dd);

    updateMetaAddBtn();
}

function removeMetaRow(btn) {
    const row = btn.closest('.meta-row');
    if (row) {
        row.remove();
        updateMetaAddBtn();
    }
}

updateMetaAddBtn();

// ============================================================
//  IMAGE UPLOAD & LOAD LOGIC
// ============================================================
const imageFrame = document.getElementById('imageFrame');
const fileInput = document.getElementById('fileInput');
const paintingImg = document.getElementById('paintingImg');
const imagePlaceholder = document.getElementById('imagePlaceholder');
const imageCaption = document.getElementById('imageCaption');

imageFrame.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isHeic = file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
    
    if (isHeic) {
        const heic2any = (await import('heic2any')).default;
        imageLoader.style.display = 'flex'; // Show loading spinner
        try {
            // Convert HEIC to JPEG blob
            const blob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.9
            });
            const reader = new FileReader();
            reader.onload = (event) => {
                paintingImg.src = event.target.result;
                imageLoader.style.display = 'none'; // Hide loading spinner
            };
            reader.readAsDataURL(blob);
        } catch (err) {
            console.error('HEIC conversion failed:', err);
            alert('Sorry, this HEIC image could not be loaded. Please try a JPG or PNG.');
            imageLoader.style.display = 'none'; // Hide loading spinner on error
        }
    } else {
        // Standard image processing for JPG, PNG, etc.
        const reader = new FileReader();
        reader.onload = (event) => {
            paintingImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function showImage() {
    paintingImg.style.display = 'block';
    imagePlaceholder.style.display = 'none';
    imageCaption.style.display = 'block';
    imageFrame.classList.remove('empty');
}

function hideImage() {
    paintingImg.style.display = 'none';
    imagePlaceholder.style.display = 'block';
    imagePlaceholder.textContent = 'Click to add image';
    imageCaption.style.display = 'block';
    imageFrame.classList.add('empty');
}

function clearImage(e) {
    e.stopPropagation();
    paintingImg.removeAttribute('src');
    hideImage();
}

paintingImg.addEventListener('load', showImage);
paintingImg.addEventListener('error', hideImage);

if (paintingImg.complete && paintingImg.naturalWidth > 0) {
    showImage();
} else {
    paintingImg.crossOrigin = "anonymous";
    paintingImg.src = `https://picsum.photos/seed/${Math.floor(Math.random() * 10000)}/450/300`;
}

// ============================================================
//  QR CODE LOGIC & MODAL
// ============================================================
let currentQRUrl = "https://www.example.com";
const qrContainer = document.getElementById('qrcode');
const qrModalOverlay = document.getElementById('qrModalOverlay');
const qrUrlInput = document.getElementById('qrUrlInput');

        async function generateQR(url) {
            const QRCode = (await import('qrcode')).default;
            qrContainer.innerHTML = '';
            const darkColor = getComputedStyle(document.documentElement).getPropertyValue('--frame-dark').trim() || '#4a4a4a';
            
            // Create a canvas element for the QR code
            const canvas = document.createElement('canvas');
            
            try {
                await QRCode.toCanvas(canvas, url, {
                    width: 200,
                    margin: 1,
                    color: {
                        dark: darkColor,
                        light: "#ffffff"
                    }
                });
                qrContainer.appendChild(canvas);
            } catch (err) {
                console.error('QR Code generation failed:', err);
            }
        }

function openQRModal() {
    qrUrlInput.value = currentQRUrl;
    qrModalOverlay.classList.add('active');
}

function closeQRModal() {
    qrModalOverlay.classList.remove('active');
}

function saveQRLink() {
    let url = qrUrlInput.value.trim();
    if (!url) url = "https://www.example.com";
    currentQRUrl = url;
    generateQR(currentQRUrl);
    closeQRModal();
}

generateQR(currentQRUrl);

qrModalOverlay.addEventListener('click', (e) => {
    if (e.target === qrModalOverlay) closeQRModal();
});

// ============================================================
//  PDF EXPORT LOGIC
// ============================================================
function waitForImage(img) {
    return new Promise(resolve => {
        if (!img.src || img.style.display === 'none' || (img.complete && img.naturalWidth === 0)) {
            resolve();
        } else if (img.complete && img.naturalWidth > 0) {
            resolve();
        } else {
            img.addEventListener('load', resolve, {
                once: true
            });
            img.addEventListener('error', resolve, {
                once: true
            });
        }
    });
}

function waitForQR() {
    return new Promise(resolve => {
        const check = () => {
            if (qrContainer.querySelector('img') || qrContainer.querySelector('canvas')) resolve();
            else setTimeout(check, 50);
        };
        check();
    });
}

async function exportPDF() {
    const btn = document.getElementById('exportBtn');
    const btnLabel = btn.querySelector('span');
    const original = btnLabel.textContent;

    btn.disabled = true;
    btnLabel.textContent = 'Loading…';

    // Dynamically load the library
    const html2pdf = (await import('html2pdf.js')).default;

    btnLabel.textContent = 'Preparing…';

    const liveImagePlaceholder = document.getElementById('imagePlaceholder');
    const originalPlaceholderText = liveImagePlaceholder ? liveImagePlaceholder.textContent : '';
    if (liveImagePlaceholder) {
        liveImagePlaceholder.textContent = 'Place for image';
    }

    const html = document.documentElement;
    const body = document.body;
    const cert = document.getElementById('certificate');

    // 1. Save all original states to restore them later
    const originalHtmlStyle = {
        width: html.style.width,
        height: html.style.height,
        margin: html.style.margin,
        overflow: html.style.overflow
    };
    const originalBodyStyle = {
        display: body.style.display,
        width: body.style.width,
        height: body.style.height,
        margin: body.style.margin,
        padding: body.style.padding,
        overflow: body.style.overflow,
        zoom: body.style.zoom 
    };
    const originalCertStyle = {
        position: cert.style.position,
        top: cert.style.top,
        left: cert.style.left,
        transform: cert.style.transform,
        boxShadow: cert.style.boxShadow
    };

    // 2. Force the live document to perfectly wrap the certificate to prevent scroll/offset calculations
    html.style.margin = '0';
    html.style.overflow = 'hidden';

    body.style.display = 'block';
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.overflow = 'hidden';
    body.style.zoom = '1';

    cert.style.position = 'absolute';
    cert.style.top = '0';
    cert.style.left = '0';
    cert.style.transform = 'none';
    cert.style.boxShadow = 'none';

    // Trigger reflow to calculate exact unscaled pixel dimensions
    void cert.offsetWidth;

    const certWidth = cert.offsetWidth;
    const certHeight = cert.offsetHeight;

    // Lock the HTML and Body to the exact certificate dimensions
    html.style.width = certWidth + 'px';
    html.style.height = certHeight + 'px';
    body.style.width = certWidth + 'px';
    body.style.height = certHeight + 'px';

    // Wrap QR code in hyperlink for clickable PDF link
    const qrWrapEl = document.getElementById('qrWrap');
    let qrLinkWrapper = null;
    if (qrWrapEl && currentQRUrl) {
        qrLinkWrapper = document.createElement('a');
        qrLinkWrapper.href = currentQRUrl;
        qrLinkWrapper.style.cssText = 'text-decoration: none; color: inherit; display: inline-block;';
        qrWrapEl.parentNode.insertBefore(qrLinkWrapper, qrWrapEl);
        qrLinkWrapper.appendChild(qrWrapEl);
    }

    try {
        const img = document.getElementById('paintingImg');
        await waitForImage(img);
        await waitForQR();
        await new Promise(r => setTimeout(r, 300));

        // Resolve all CSS variables into solid color strings
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-cert').trim();
        const mutedColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
        const frameMidColor = getComputedStyle(document.documentElement).getPropertyValue('--frame-mid').trim();
        const frameLightColor = getComputedStyle(document.documentElement).getPropertyValue('--frame-light').trim();

        const opt = {
            margin: 0,
            enableLinks: true,
            filename: 'fine-art-authenticity-certificate.pdf',
            image: {
                type: 'jpeg',
                quality: 0.85
            },
            html2canvas: {
                scale: 6,
                useCORS: true,
                allowTaint: true,
                backgroundColor: bgColor,
                logging: false,
                width: certWidth,
                height: certHeight,
                windowWidth: certWidth,
                windowHeight: certHeight,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
                onclone: function(clonedDoc) {
                    const clonedHtml = clonedDoc.documentElement;
                    const clonedBody = clonedDoc.body;

                    clonedHtml.style.width = certWidth + 'px';
                    clonedHtml.style.height = certHeight + 'px';
                    clonedHtml.style.margin = '0';
                    clonedHtml.style.overflow = 'hidden';

                    clonedBody.style.width = certWidth + 'px';
                    clonedBody.style.height = certHeight + 'px';
                    clonedBody.style.margin = '0';
                    clonedBody.style.padding = '0';
                    clonedBody.style.overflow = 'hidden';
                    clonedBody.style.display = 'block';

                    const clonedCert = clonedDoc.getElementById('certificate');
                    if (clonedCert) {
                        clonedCert.style.position = 'absolute';
                        clonedCert.style.top = '0';
                        clonedCert.style.left = '0';
                        clonedCert.style.transform = 'none';
                        clonedCert.style.margin = '0';
                        clonedCert.style.boxShadow = 'none';
                        clonedCert.style.backgroundColor = bgColor;
                    }

                    clonedDoc.querySelectorAll('[contenteditable="true"]').forEach(el => {
                        el.style.backgroundColor = 'transparent';
                        el.style.boxShadow = 'none';
                    });

                    clonedDoc.querySelectorAll('.placeholder-text').forEach(el => {
                        el.innerText = '';
                    });

                    clonedDoc.querySelectorAll('.cert-header h1').forEach(el => el.style.color = primaryColor);
                    clonedDoc.querySelectorAll('.eyebrow').forEach(el => el.style.color = mutedColor);
                    clonedDoc.querySelectorAll('.painting-title').forEach(el => el.style.color = primaryColor);
                    clonedDoc.querySelectorAll('.by-line').forEach(el => el.style.color = secondaryColor);
                    clonedDoc.querySelectorAll('.by-line .artist').forEach(el => el.style.color = primaryColor);
                    clonedDoc.querySelectorAll('.image-placeholder').forEach(el => el.style.color = mutedColor);
                    clonedDoc.querySelectorAll('.image-caption').forEach(el => el.style.color = mutedColor);
                    clonedDoc.querySelectorAll('.qr-label').forEach(el => el.style.color = primaryColor);
                    clonedDoc.querySelectorAll('.sign-label').forEach(el => el.style.color = mutedColor);
                    clonedDoc.querySelectorAll('.meta-row dt').forEach(el => el.style.color = mutedColor);
                    clonedDoc.querySelectorAll('.meta-row dd').forEach(el => el.style.color = primaryColor);

                    clonedDoc.querySelectorAll('.frame-outer').forEach(el => el.style.borderColor = frameMidColor);
                    clonedDoc.querySelectorAll('.frame-inner').forEach(el => el.style.borderColor = frameLightColor);
                    clonedDoc.querySelectorAll('.header-divider .line').forEach(el => el.style.backgroundColor = frameMidColor);
                    clonedDoc.querySelectorAll('.header-divider .diamond').forEach(el => el.style.backgroundColor = frameMidColor);
                    clonedDoc.querySelectorAll('.sign-line').forEach(el => el.style.borderColor = frameMidColor);
                    clonedDoc.querySelectorAll('.sign-label').forEach(el => el.style.color = mutedColor);
                    clonedDoc.querySelectorAll('.arch').forEach(el => el.style.borderColor = frameMidColor);
                    clonedDoc.querySelectorAll('.dot').forEach(el => el.style.backgroundColor = frameMidColor);

                    const clonedByLines = clonedDoc.querySelectorAll('.by-line');
                    clonedByLines.forEach(clonedByLine => {
                        const clonedArtist = clonedByLine.querySelector('.artist');
                        const clonedByWord = clonedByLine.querySelector('.by-word');

                        let isEmpty = true;

                        if (clonedArtist) {
                            const isPlaceholder = clonedArtist.classList.contains('placeholder-text');
                            const currentText = (clonedArtist.innerText || '').trim();

                            if (!isPlaceholder && currentText !== '') {
                                isEmpty = false;
                            }
                        }

                        if (isEmpty) {
                            clonedByLine.style.display = 'none';
                        } else {
                            clonedByLine.classList.remove('empty-artist');
                            if (clonedByWord) clonedByWord.style.opacity = '1';
                            if (clonedArtist) {
                                clonedArtist.style.opacity = '1';
                                clonedArtist.classList.remove('placeholder-text');
                            }
                        }
                    });

                    clonedDoc.querySelectorAll('img').forEach(el => {
                        if (!el.getAttribute('src') || el.src === window.location.href) {
                            el.remove();
                        }
                    });

                    const clonedPaintingImg = clonedDoc.getElementById('paintingImg');
                    if (clonedPaintingImg) {
                        const hasValidSrc = clonedPaintingImg.getAttribute('src') && clonedPaintingImg.src !== window.location.href;
                        if (clonedPaintingImg.style.display === 'none' || !hasValidSrc) {
                            clonedPaintingImg.remove();
                        }
                    }

                    const clonedImagePlaceholder = clonedDoc.getElementById('imagePlaceholder');
                    if (clonedImagePlaceholder) {
                        clonedImagePlaceholder.innerHTML = 'Place for image';
                        clonedImagePlaceholder.innerText = 'Place for image';
                        clonedImagePlaceholder.textContent = 'Place for image';
                    }

                    const overlay = clonedDoc.querySelector('.upload-overlay');
                    if (overlay) overlay.style.display = 'none';

                    clonedDoc.querySelectorAll('.meta-delete-btn, .meta-add-btn, .clear-image-btn').forEach(el => el.style.display = 'none');
                    clonedDoc.querySelectorAll('.meta-row').forEach(row => {
                        const dt = row.querySelector('dt');
                        const dd = row.querySelector('dd');
                        if (dt && dt.classList.contains('placeholder-text') && dd && dd.classList.contains('placeholder-text')) {
                            row.style.display = 'none';
                        } else {
                            row.style.gridTemplateColumns = '42mm 1fr';
                        }
                    });
                    clonedDoc.querySelectorAll('.sign-field').forEach(field => {
                        const label = field.querySelector('.sign-label');
                        if (label && label.classList.contains('placeholder-text')) {
                            field.style.display = 'none';
                        }
                    });
                }
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'landscape',
                compress: true
            }
        };

        // Instead of just saving, we intercept the jsPDF object to add an invisible text layer
        await html2pdf().set(opt).from(cert).toPdf().get('pdf').then((pdf) => {
            const certRect = cert.getBoundingClientRect();
            
            // Iterate over all editable text elements in the live DOM
            document.querySelectorAll('[contenteditable="true"]').forEach(el => {
                if (!el.offsetParent) return; // Skip if hidden
                if (el.classList.contains('placeholder-text')) return;
                
                // Skip the artist name if the by-line is marked as empty
                if (el.classList.contains('artist') && el.closest('.by-line.empty-artist')) return;
                
                const text = el.innerText.trim().replace(/\n/g, ' ');
                if (!text) return;

                const rect = el.getBoundingClientRect();
                
                // Calculate position and size relative to the certificate dimensions
                const xPx = rect.left - certRect.left;
                const yPx = rect.top - certRect.top;
                const wPx = rect.width;
                const hPx = rect.height;

                const xMm = (xPx / certRect.width) * 297;
                const yMm = (yPx / certRect.height) * 210;
                const wMm = (wPx / certRect.width) * 297;
                const hMm = (hPx / certRect.height) * 210;

                // jsPDF places text by its baseline, so we offset roughly 75% down the height
                const yBaseline = yMm + hMm * 0.75;
                // Convert mm to points for font size (1mm = 2.834645669 points)
                const fontSizePt = hMm * 2.834645669 * 0.85; 

                pdf.setFontSize(fontSizePt);
                
                // Set text rendering state to fully transparent
                try {
                    pdf.setGState(pdf.GState({ opacity: 0 }));
                } catch (e) {
                    // Fallback for older jsPDF versions if GState fails
                    pdf.setTextColor(255, 255, 255); 
                }

                // Match the CSS text alignment
                const textAlign = window.getComputedStyle(el).textAlign;
                let align = 'left';
                let x = xMm;
                if (textAlign === 'center') {
                    align = 'center';
                    x = xMm + wMm / 2;
                } else if (textAlign === 'right') {
                    align = 'right';
                    x = xMm + wMm;
                }

                // Add the invisible text overlay
                pdf.text(text, x, yBaseline, {
                    maxWidth: wMm,
                    align: align
                });
            });

            // Add invisible clickable text link over the QR code
            const qrWrapEl = document.getElementById('qrWrap');
            if (qrWrapEl && currentQRUrl) {
                const rect = qrWrapEl.getBoundingClientRect();
                
                const xPx = rect.left - certRect.left;
                const yPx = rect.top - certRect.top;
                const wPx = rect.width;
                const hPx = rect.height;

                const xMm = (xPx / certRect.width) * 297;
                const yMm = (yPx / certRect.height) * 210;
                const wMm = (wPx / certRect.width) * 297;
                const hMm = (hPx / certRect.height) * 210;

                const yBaseline = yMm + hMm * 0.99; // Position near the bottom
                const fontSizePt = 3; // Very small font size to prevent wrapping

                pdf.setFontSize(fontSizePt);
                
                // Ensure text is fully transparent
                try {
                    pdf.setGState(pdf.GState({ opacity: 0 }));
                } catch (e) {
                    pdf.setTextColor(255, 255, 255); 
                }

                // Add invisible text with a hyperlink over the QR code
                pdf.textWithLink(currentQRUrl, xMm + wMm / 2, yBaseline, {
                    align: 'center',
                    url: currentQRUrl
                });
            }

            // Reset graphics state just in case
            try {
                pdf.setGState(pdf.GState({ opacity: 1 }));
            } catch (e) {
                pdf.setTextColor(0, 0, 0);
            }

            // Finally, save the PDF with the overlaid ghost text
            pdf.save('fine-art-authenticity-certificate.pdf');
        });
    } catch (err) {
        console.error('PDF export failed:', err);
        alert('PDF export failed: ' + err.message);
    } finally {
        html.style.width = originalHtmlStyle.width;
        html.style.height = originalHtmlStyle.height;
        html.style.margin = originalHtmlStyle.margin;
        html.style.overflow = originalHtmlStyle.overflow;

        body.style.display = originalBodyStyle.display;
        body.style.width = originalBodyStyle.width;
        body.style.height = originalBodyStyle.height;
        body.style.margin = originalBodyStyle.margin;
        body.style.padding = originalBodyStyle.padding;
        body.style.overflow = originalBodyStyle.overflow;
        body.style.zoom = originalBodyStyle.zoom;

        cert.style.position = originalCertStyle.position;
        cert.style.top = originalCertStyle.top;
        cert.style.left = originalCertStyle.left;
        cert.style.transform = originalCertStyle.transform;
        cert.style.boxShadow = originalCertStyle.boxShadow;

        if (qrLinkWrapper && qrWrapEl) {
            qrLinkWrapper.parentNode.insertBefore(qrWrapEl, qrLinkWrapper);
            qrLinkWrapper.remove();
        }

        if (liveImagePlaceholder) {
            liveImagePlaceholder.textContent = originalPlaceholderText;
        }

        btn.disabled = false;
        btnLabel.textContent = original;
    }
}

// ============================================================
//  EVENT LISTENERS FOR HTML ELEMENTS (Replaces inline onclick)
// ============================================================

// Export Button
document.getElementById('exportBtn').addEventListener('click', exportPDF);

// Meta List Add Button
document.getElementById('metaAddBtn').addEventListener('click', addMetaRow);

// Meta List Delete Buttons (using event delegation since rows can be added dynamically)
document.getElementById('metaList').addEventListener('click', (e) => {
    if (e.target.matches('.meta-delete-btn')) {
        removeMetaRow(e.target);
    }
});

// QR Modal Open
document.getElementById('qrWrap').addEventListener('click', openQRModal);

// QR Modal Buttons
document.querySelector('[data-action="close-qr"]').addEventListener('click', closeQRModal);
document.querySelector('[data-action="save-qr"]').addEventListener('click', saveQRLink);

// Clear Image Button
document.getElementById('clearImageBtn').addEventListener('click', (e) => clearImage(e));