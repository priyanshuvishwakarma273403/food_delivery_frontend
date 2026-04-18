/**
 * Utility to optimize Cloudinary URLs by adding automatic format and quality transformations.
 * If the URL is not from Cloudinary, it returns the original URL.
 * 
 * @param {string} url - The original image URL
 * @param {object} options - Transformation options (width, height, crop, etc.)
 * @returns {string} - Optimized URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const {
    width = 'auto',
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/v<version>/<public_id>
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  let transformationStr = `f_${format},q_${quality}`;
  if (width && width !== 'auto') transformationStr += `,w_${width}`;
  if (height) transformationStr += `,h_${height}`;
  if (crop) transformationStr += `,c_${crop}`;

  return `${parts[0]}/upload/${transformationStr}/${parts[1]}`;
};
