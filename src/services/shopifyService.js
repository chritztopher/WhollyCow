let ShopifyBuy;
let client;

// Shopify configuration from your provided code
const SHOPIFY_CONFIG = {
  domain: 'jame3r-0v.myshopify.com',
  storefrontAccessToken: '969513a37bebbf0e50a6b0c54730c834',
  // Product IDs for each scent (separate products, not variants)
  products: {
    lavender: 'gid://shopify/Product/7839558697041',
    thieves: 'gid://shopify/Product/7839557648465',
    unscented: 'gid://shopify/Product/7839557288017'
  }
};

// Variant mapping for lavender product
// We'll need to get the actual variant IDs, but for now we'll fetch them dynamically
const VARIANT_MAPPING = {
  lavender: null, // Will be populated dynamically
  unscented: null, // Will be populated dynamically  
  thieves: null // Will be populated dynamically
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
    document.head.appendChild(script);
  });
};

// Initialize Shopify client
const initializeClient = async () => {
  if (client) return client;
  
  await loadShopifySDK();
  
  client = ShopifyBuy.buildClient({
    domain: SHOPIFY_CONFIG.domain,
    storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
  });
  
  return client;
};

// Get variant mapping by fetching product data for each scent
const getVariantMapping = async () => {
  try {
    const shopifyClient = await initializeClient();
    const mapping = {};
    
    // Fetch each product separately
    for (const [scent, productId] of Object.entries(SHOPIFY_CONFIG.products)) {
      if (!productId) {
        console.log(`⚠️ Skipping ${scent} - no product ID provided`);
        continue;
      }
      
      try {
        console.log(`🔍 Fetching ${scent} product:`, productId);
        const product = await shopifyClient.product.fetch(productId);
        
        console.log(`✅ ${scent} product found:`, product.title);
        console.log(`🔍 Available variants for ${scent}:`, product.variants.length);
        
        // For single-variant products, use the first (usually only) variant
        const firstVariant = product.variants.find(v => v.available) || product.variants[0];
        if (firstVariant) {
          mapping[scent] = firstVariant.id;
          console.log(`✅ Mapped ${scent} to variant:`, firstVariant.id);
        } else {
          console.warn(`⚠️ No available variant found for ${scent}`);
        }
        
      } catch (productError) {
        console.error(`❌ Failed to fetch ${scent} product:`, productError);
      }
    }
    
    console.log('🎯 Final variant mapping:', mapping);
    return mapping;
  } catch (error) {
    console.error('❌ Failed to get variant mapping:', error);
    // Show the actual error details
    if (error && error.length > 0) {
      console.error('Variant mapping error details:', error[0]);
    } else {
      console.error('Variant mapping error object:', error);
    }
    return {};
  }
};

// Create Shopify checkout with popup
export const createCheckout = async (cartItems) => {
  try {
    console.log('🛒 Creating Shopify checkout...', cartItems);
    
    const shopifyClient = await initializeClient();
    const variantMapping = await getVariantMapping();
    
    // If variant mapping is empty, try to create fallback mappings
    if (Object.keys(variantMapping).length === 0) {
      console.warn('⚠️ No variant mapping found, attempting fallback...');
      
      // Try to get at least one working product for fallback
      for (const [scent, productId] of Object.entries(SHOPIFY_CONFIG.products)) {
        if (!productId) continue;
        
        try {
          const product = await shopifyClient.product.fetch(productId);
          const firstVariant = product.variants.find(v => v.available) || product.variants[0];
          
          if (firstVariant) {
            console.log(`🔄 Using ${scent} as fallback variant:`, firstVariant.id);
            variantMapping.fallback = firstVariant.id;
            break; // Use first working product as fallback
          }
        } catch (error) {
          console.error(`❌ Fallback failed for ${scent}:`, error);
        }
      }
    }
    
    // Create checkout
    const checkout = await shopifyClient.checkout.create();
    console.log('✅ Checkout created:', checkout.id);
    
    // Convert cart items to Shopify line items
    const lineItems = cartItems.map(item => {
      let variantId = variantMapping[item.variant.toLowerCase()];
      
      if (!variantId) {
        console.warn(`⚠️ No variant ID found for ${item.variant}, trying fallback...`);
        // Try fallback variant
        variantId = variantMapping.fallback;
        
        if (!variantId) {
          console.error(`❌ No fallback variant available for ${item.variant}`);
          return null;
        }
        
        console.log(`🔄 Using fallback variant ${variantId} for ${item.variant}`);
      }
      
      return {
        variantId: variantId,
        quantity: item.quantity
      };
    }).filter(item => item !== null);
    
    if (lineItems.length === 0) {
      throw new Error('No valid line items to add to checkout');
    }
    
    console.log('📦 Adding line items to checkout:', lineItems);
    
    // Add line items to checkout
    const checkoutWithItems = await shopifyClient.checkout.addLineItems(checkout.id, lineItems);
    console.log('✅ Items added to checkout');
    
    // Open checkout in popup
    const checkoutUrl = checkoutWithItems.webUrl;
    console.log('🚀 Opening checkout URL:', checkoutUrl);
    
    // Open in popup window (like Shopify Buy Button does)
    const popup = window.open(
      checkoutUrl,
      'shopify-checkout',
      'width=800,height=600,scrollbars=yes,resizable=yes,status=yes,toolbar=no,menubar=no,location=no'
    );
    
    if (!popup) {
      // Fallback to same window if popup blocked
      window.location.href = checkoutUrl;
    }
    
    return { success: true, checkoutUrl };
    
  } catch (error) {
    console.error('❌ Checkout creation failed:', error);
    return { success: false, error: error.message };
  }
};

// Debug function to test Shopify connection
export const debugShopifyConnection = async () => {
  try {
    console.log('🔍 Testing Shopify connection...');
    console.log('Domain:', SHOPIFY_CONFIG.domain);
    console.log('Products:', SHOPIFY_CONFIG.products);
    
    const shopifyClient = await initializeClient();
    console.log('✅ Client initialized successfully');
    
    const results = {};
    
    // Test each product
    for (const [scent, productId] of Object.entries(SHOPIFY_CONFIG.products)) {
      if (!productId) {
        console.log(`⚠️ Skipping ${scent} - no product ID provided`);
        continue;
      }
      
      try {
        console.log(`\n🔍 Testing ${scent} product:`, productId);
        const product = await shopifyClient.product.fetch(productId);
        console.log(`✅ ${scent} product found:`, product.title);
        console.log(`Available variants for ${scent}:`, product.variants.length);
        
        product.variants.forEach((variant, index) => {
          console.log(`${scent} Variant ${index + 1}:`, {
            id: variant.id,
            title: variant.title,
            available: variant.available,
            selectedOptions: variant.selectedOptions
          });
        });
        
        results[scent] = { success: true, product };
      } catch (productError) {
        console.error(`❌ Failed to fetch ${scent} product:`, productError);
        results[scent] = { success: false, error: productError };
      }
    }
    
    return { success: true, results };
  } catch (error) {
    console.error('❌ Shopify connection failed:', error);
    // Show the actual error details
    if (error && error.length > 0) {
      console.error('Error details:', error[0]);
      return { success: false, error: error[0].message || 'Unknown error' };
    } else {
      console.error('Error object:', error);
      return { success: false, error: error.message || 'Unknown error' };
    }
  }
};

// Fallback for direct cart URL (keep as backup)
export const createSimpleCheckoutUrl = (cartItems) => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Try to use the correct product ID based on the first item's variant
  let productId = null;
  if (cartItems.length > 0) {
    const firstItemVariant = cartItems[0].variant.toLowerCase();
    const shopifyProductId = SHOPIFY_CONFIG.products[firstItemVariant];
    if (shopifyProductId) {
      // Extract numeric ID from GID
      productId = shopifyProductId.split('/').pop();
    }
  }
  
  // Fallback to lavender if no specific product found
  if (!productId && SHOPIFY_CONFIG.products.lavender) {
    productId = SHOPIFY_CONFIG.products.lavender.split('/').pop();
  }
  
  if (!productId) {
    console.error('❌ No product ID available for fallback URL');
    return `https://${SHOPIFY_CONFIG.domain}/cart`;
  }
  
  return `https://${SHOPIFY_CONFIG.domain}/cart/add?id=${productId}&quantity=${totalQuantity}&return_to=/checkout`;
}; 