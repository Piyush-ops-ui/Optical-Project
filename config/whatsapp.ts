/**
 * Centralized WhatsApp Configuration for Tiwari Optical
 * Change WHATSAPP_NUMBER here to update the ordering destination across the entire store.
 */
export const WHATSAPP_NUMBER = "918788983420";

/**
 * Generate a properly URL-encoded WhatsApp Click-to-Chat ordering link
 * for any sunglasses product.
 */
export function getWhatsAppOrderUrl(product: {
  name: string;
  id: string;
  price: number;
}): string {
  const message = [
    'Hello Tiwari Optical,',
    '',
    'I am interested in this sunglasses product:',
    '',
    `Product: ${product.name}`,
    `Product ID: ${product.id}`,
    `Price: ₹${product.price.toLocaleString('en-IN')}`,
    '',
    'Please confirm availability and ordering details.'
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
