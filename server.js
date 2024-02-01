const express = require('express');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const generatePlaceholderImageWithText = async (
    width,
    height,
    message,
    bgColor,
    textColor,
    fontSize,
    fontFamily,
    textAnchor,
    textX,
    textY,
    textBorderSize,
    textBorderColor,
    borderRadius
) => {
    // Validate width and height
    if (width < 50 || width > 1000 || height < 50 || height > 1000) {
        message = 'Invalid dimensions. Width and height must be between 50 and 1000 pixels.';
        width = 300;
        height = 150;
    }

    // Validate font size
    fontSize = Math.max(8, Math.min(48, parseInt(fontSize))) || 16;

    // Validate text border size
    textBorderSize = Math.max(0, Math.min(10, parseInt(textBorderSize))) || '';

    // Validate border radius
    borderRadius = Math.max(0, Math.min(50, parseInt(borderRadius))) || '';

    const border = textBorderSize
        ? `<rect
        width="100%"
        height="100%"
        fill="none"
        stroke="#${textBorderColor || '000000'}"
        stroke-width="${textBorderSize}"
        ${borderRadius ? `rx="${borderRadius}" ry="${borderRadius}"` : ''}
      />`
        : '';

    const overlay = `<svg width="${width}" height="${height}">
    <rect
      width="100%"
      height="100%"
      fill="#${bgColor || 'cccccc'}"
      ${borderRadius ? `rx="${borderRadius}" ry="${borderRadius}"` : ''}
    />
    ${border}
    <text
      x="${textX || '50%'}"
      y="${textY || '50%'}"
      font-family="${fontFamily || 'sans-serif'}"
      font-size="${fontSize}"
      text-anchor="${textAnchor || 'middle'}"
      fill="#${textColor || '000000'}">
      ${message.split('\n').map((line, index) => `<tspan x="${textX || '50%'}" dy="${index === 0 ? 0 : '1.2em'}">${line}</tspan>`).join('')}
    </text>
  </svg>`;


    return await sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 0 },
        },
    })
        .composite([
            {
                input: Buffer.from(overlay),
                gravity: 'center',
            },
        ])
        .png()
        .toBuffer();
};

app.get('/image-placeholder', async (req, res) => {
    try {
        let width = parseInt(req.query.w) || 300;
        let height = parseInt(req.query.h) || 150;
        let message = req.query.message || `${width}x${height}`;
        let bgColor = req.query.bgColor || 'cccccc';
        let textColor = req.query.textColor || '000000';
        let fontSize = req.query.fontSize || '16';
        const fontFamily = req.query.fontFamily || 'sans-serif';
        const textAnchor = req.query.textAnchor || 'middle';
        const textX = req.query.textX || '50%';
        const textY = req.query.textY || '50%';
        const textBorderSize = req.query.textBorderSize || '';
        const textBorderColor = req.query.textBorderColor || '';
        const borderRadius = req.query.borderRadius || '';

        // If there's an error related to the image size, generate image with default size and message
        if (width < 50 || width > 1000 || height < 50 || height > 1000) {
            message = 'Invalid dimensions. \nWidth and height must be between 50 and 1000 pixels.';
            width = 300;
            height = 150;
            bgColor = 'cccccc';
            textColor = '000000';
            fontSize = '12';


        }

        const imageBuffer = await generatePlaceholderImageWithText(
            width,
            height,
            message,
            bgColor,
            textColor,
            fontSize,
            fontFamily,
            textAnchor,
            textX,
            textY,
            textBorderSize,
            textBorderColor,
            borderRadius
        );

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
