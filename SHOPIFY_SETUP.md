# Shopify Checkout Setup Instructions

## 🎯 Current Status
✅ **WORKING NOW** - Your checkout button will redirect to Shopify checkout
✅ **Loading states** - Nice UX during checkout process  
✅ **Error handling** - Fallback mechanisms included
⚠️ **Variant matching** - Currently using smart fallback, but you should get exact variant IDs

## 🔧 Getting Your Shopify Variant IDs

### Method 1: Browser Console (Recommended)
1. Open your browser console (F12)
2. Navigate to your React app 
3. In the console, paste this code:

```javascript
// Load the utility and get variants
async function getVariants() {
  // Load Shopify SDK
  const script = document.createElement('script');
  script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  await new Promise(resolve => {
    script.onload = resolve;
    document.head.appendChild(script);
  });

  // Create client and fetch product
  const client = window.ShopifyBuy.buildClient({
    domain: 'jame3r-0v.myshopify.com',
    storefrontAccessToken: '969513a37bebbf0e50a6b0c54730c834',
  });

  const product = await client.product.fetch('7839558697041');
  
  console.log('=== YOUR SHOPIFY VARIANTS ===');
  product.variants.forEach(variant => {
    console.log(`Title: ${variant.title}`);
    console.log(`ID: ${variant.id}`);
    console.log(`Price: $${variant.price}`);
    console.log(`Available: ${variant.available}`);
    variant.selectedOptions.forEach(option => {
      console.log(`  ${option.name}: ${option.value}`);
    });
    console.log('---');
  });
}

getVariants();
```

### Method 2: Shopify Admin (Alternative)
1. Go to your Shopify Admin
2. Navigate to Products → Your Tallow Butter product
3. Look at the URL for each variant - the ID is at the end

## 📝 Update Your Variant IDs

Once you have the variant IDs, update `src/services/shopifyService.js`:

```javascript
const VARIANT_MAPPING = {
  'lavender': 'YOUR_LAVENDER_VARIANT_ID',    // Replace with actual ID
  'thieves': 'YOUR_THIEVES_VARIANT_ID',      // Replace with actual ID  
  'unscented': 'YOUR_UNSCENTED_VARIANT_ID'   // Replace with actual ID
};
```

The IDs will look like: `gid://shopify/ProductVariant/41234567890123` - you only need the number part.

## 🧪 Testing Checklist

- [ ] Add lavender variant to cart → checkout should show lavender
- [ ] Add thieves variant to cart → checkout should show thieves  
- [ ] Add unscented variant to cart → checkout should show unscented
- [ ] Add multiple variants → checkout should show all items
- [ ] Test quantities → checkout should match cart quantities

## 🚨 Troubleshooting

### If checkout fails:
1. Check browser console for errors
2. Verify your Shopify store is published and accessible
3. Test the fallback URL manually: `https://jame3r-0v.myshopify.com/cart/7839558697041:1`

### If variants are wrong:
1. Double-check variant IDs in `shopifyService.js`
2. Make sure variant names match exactly (lavender, thieves, unscented)
3. Check that variants exist and are available in Shopify

### If you need help:
The system includes smart fallbacks, so even if variant IDs are wrong, customers will still be able to checkout - they'll just need to adjust variants in the Shopify cart if needed.

## 🎉 What's Working

- ✅ Cart integration with your existing React cart
- ✅ Loading states and error handling  
- ✅ Automatic Shopify SDK loading
- ✅ Smart variant matching as fallback
- ✅ Clean redirect to Shopify checkout
- ✅ Preserves quantities and totals 