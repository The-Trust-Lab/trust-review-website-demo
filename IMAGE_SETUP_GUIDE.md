# Product Image Setup Guide

## What I've Done

I've successfully updated your trust review website to use single product images instead of multiple images. Here's what was changed:

### 1. Created Image Folder Structure
- **Folder**: `public/images/products/`
- **Purpose**: This is where you'll upload your product images
- **README**: Contains detailed instructions for image naming and specifications

### 2. Updated Data Structure
- **Products**: Changed from `images: [array]` to `image: "string"`
- **Reviews**: Removed unused `images: []` fields
- **Components**: Updated all components to use single images

### 3. Updated Components
- `ProductCard.tsx` - Now displays single product image
- `ProductDetailClient.tsx` - Simplified to show single image (removed gallery)
- `cart.ts` - Updated to use single image for cart items

## Next Steps for You

### 1. Upload Your Product Images
Place your images in the `public/images/products/` folder with these exact names:

- `classic-tee.jpg` (or .png, .webp)
- `premium-hoodie.jpg`
- `slim-fit-jeans.jpg`
- `lightweight-windbreaker.jpg`
- `canvas-cap.jpg`

### 2. Image Specifications
- **Size**: 600x800 pixels (portrait orientation recommended)
- **Format**: JPG, PNG, or WebP
- **File size**: Keep under 500KB for optimal performance

### 3. Update Product Data (Optional)
If you want to use different image names, update the `image` field in `data/products.json`:

```json
{
  "id": "classic-tee",
  "image": "/images/products/your-image-name.jpg"
}
```

## Current Status

✅ **Ready for your images**: The website is set up to use your product images
✅ **Single image per product**: No more multiple image arrays
✅ **Responsive design**: Images will scale properly on all devices
✅ **Fallback handling**: Shows placeholder if image is missing

## Testing

Once you upload your images:
1. The website will automatically use them
2. Product cards will display your images
3. Product detail pages will show your images
4. Cart will use your product images

## Need Help?

If you encounter any issues:
1. Check that image names match exactly (case-sensitive)
2. Ensure images are in the correct folder
3. Verify image formats are supported (JPG, PNG, WebP)
4. Check browser console for any errors

Your website is now ready to showcase your actual product images!
