let ShopifyBuy;
let client;

// Shopify configuration from your provided code
const SHOPIFY_CONFIG = {
  domain: 'jame3r-0v.myshopify.com',
  storefrontAccessToken: '969513a37bebbf0e50a6b0c54730c834',
  productId: '7839558697041'
};

// Debug function to test Shopify connection
export const debugShopifyConnection = async () => {
  try {
    console.log('🔍 Testing Shopify connection...');
    console.log('Domain:', SHOPIFY_CONFIG.domain);
    console.log('Product ID:', SHOPIFY_CONFIG.productId);
    
    const shopifyClient = await initializeClient();
    console.log('✅ Client initialized successfully');
    
    // Try to fetch the product
    const product = await shopifyClient.product.fetch(SHOPIFY_CONFIG.productId);
    console.log('✅ Product found:', product.title);
    console.log('Available variants:', product.variants.length);
    
    product.variants.forEach((variant, index) => {
      console.log(`Variant ${index + 1}:`, variant.title, '- Available:', variant.available);
    });
    
    return { success: true, product };
  } catch (error) {
    console.error('❌ Shopify connection failed:', error);
    return { success: false, error: error.message };
  }
};

// Load Shopify Buy SDK
const loadShopifySDK = () => {
  return new Promise((resolve, reject) => {
    if (window.ShopifyBuy) {
      ShopifyBuy = window.ShopifyBuy;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.onload = () => {
      ShopifyBuy = window.ShopifyBuy;
      resolve();
    };
    script.onerror = reject;
    
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
  });
};

// Initialize Shopify client
const initializeClient = async () => {
  if (!ShopifyBuy) {
    await loadShopifySDK();
  }
  
  if (!client) {
    client = ShopifyBuy.buildClient({
      domain: SHOPIFY_CONFIG.domain,
      storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
    });
  }
  
  return client;
};

// TODO: Replace these with your actual Shopify variant IDs
// Run src/utils/getShopifyVariants.js to find these IDs
const VARIANT_MAPPING = {
  'lavender': '41234567890123', // Replace with actual variant ID
  'thieves': '41234567890124',  // Replace with actual variant ID  
  'unscented': '41234567890125' // Replace with actual variant ID
};

// Create checkout with cart items
export const createCheckout = async (cartItems) => {
  try {
    console.log('🛒 Creating checkout for items:', cartItems);
    
    const shopifyClient = await initializeClient();
    console.log('✅ Shopify client initialized');
    
    // First, try to get the product to understand available variants
    const product = await shopifyClient.product.fetch(SHOPIFY_CONFIG.productId);
    console.log('✅ Product fetched:', product.title);
    
    if (!product) {
      throw new Error('Product not found - check your product ID');
    }
    
    // Create an empty checkout
    const checkout = await shopifyClient.checkout.create();
    console.log('✅ Checkout created:', checkout.id);
    
    // Convert cart items to Shopify line items
    const lineItemsToAdd = cartItems.map(item => {
      // Try to find matching variant by title/name
      let variantId = VARIANT_MAPPING[item.variant];
      
      if (!variantId || variantId.startsWith('41234567890')) {
        // Fallback: try to find variant by matching title
        const matchingVariant = product.variants.find(variant => 
          variant.title.toLowerCase().includes(item.variant.toLowerCase()) ||
          variant.selectedOptions.some(option => 
            option.value.toLowerCase().includes(item.variant.toLowerCase())
          )
        );
        
        if (matchingVariant) {
          variantId = matchingVariant.id;
          console.log(`✅ Found matching variant for ${item.variant}:`, variantId);
        } else {
          // Final fallback: use first available variant
          variantId = product.variants.find(v => v.available)?.id || product.variants[0]?.id;
          console.log(`⚠️ Using fallback variant for ${item.variant}:`, variantId);
        }
      }
      
      return {
        variantId: variantId,
        quantity: item.quantity
      };
    });
    
    console.log('📦 Line items to add:', lineItemsToAdd);
    
    // Add line items to checkout
    const checkoutWithItems = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
    console.log('✅ Items added to checkout');
    
    // Return the checkout URL to redirect user
    return checkoutWithItems.webUrl;
  } catch (error) {
    console.error('❌ Error creating Shopify checkout:', error);
    
    // More specific error handling
    if (error.message.includes('NOT_FOUND')) {
      console.error('🚨 Product not found - possible issues:');
      console.error('1. Product ID is incorrect');
      console.error('2. Product is not published to storefront');
      console.error('3. Storefront access token is invalid');
    }
    
    // Fallback to simple add-to-cart URL
    console.log('🔄 Falling back to simple cart URL...');
    return createSimpleCheckoutUrl(cartItems);
  }
};

// Fallback: Create a simple add-to-cart URL
export const createSimpleCheckoutUrl = (cartItems) => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Create a simple add to cart URL - this will add the product to Shopify cart
  // The customer can then adjust variants in the cart if needed
  const fallbackUrl = `https://${SHOPIFY_CONFIG.domain}/cart/${SHOPIFY_CONFIG.productId}:${totalQuantity}`;
  console.log('🔄 Using fallback URL:', fallbackUrl);
  return fallbackUrl;
};

// Helper function to manually redirect to checkout
export const redirectToShopifyCheckout = (cartItems) => {
  const checkoutUrl = createSimpleCheckoutUrl(cartItems);
  window.location.href = checkoutUrl;
}; 