/**
 * Generate WhatsApp message from lead data
 */
export const generateWhatsAppMessage = (leadData) => {
  const { name, email, phone, projectType, budgetRange, message } = leadData;

  const whatsappMessage = `Hello ByteBloom Agency! 👋

I'm interested in your services:

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🎯 Project Type: ${projectType}
💰 Budget Range: ${budgetRange}

💬 Message:
${message}

Looking forward to hearing from you!`;
  return encodeURIComponent(whatsappMessage);
};

// Open WhatsApp with pre-filled message
export const openWhatsApp = (phoneNumber, message) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};
