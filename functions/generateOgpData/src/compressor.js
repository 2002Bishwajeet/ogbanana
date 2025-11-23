import sharp from 'sharp';

/**
 * Compresses and resizes an image to be suitable for Open Graph Protocol (OGP) previews.
 * Targets 1200x630 resolution with high-quality JPEG compression.
 *
 * @param {string} dataUrl - The input image as a base64 data URL.
 * @returns {Promise<string>} - The compressed image as a base64 data URL (image/jpeg).
 */
export async function compressOgpImage(dataUrl) {
  if (!dataUrl) {
    throw new Error('Image data URL is required for compression.');
  }

  // Extract base64 data
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid data URL format.');
  }

  const inputBuffer = Buffer.from(matches[2], 'base64');

  try {
    const outputBuffer = await sharp(inputBuffer)
      .resize({
        width: 1200,
        height: 630,
        fit: 'cover', // Crop to fill the 1200x630 area
        position: 'center', // Focus on the center (or 'top' if preferred for screenshots)
        withoutEnlargement: true, // Do not upscale if the image is smaller
      })
      .jpeg({
        quality: 85, // Good balance of quality and file size
        mozjpeg: true, // Use Mozilla's JPEG encoder for better compression
        chromaSubsampling: '4:4:4', // Prevent color bleeding on text/sharp edges
      })
      .toBuffer();

    return `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
}
