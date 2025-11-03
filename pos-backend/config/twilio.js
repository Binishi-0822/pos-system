import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send WhatsApp message after customer account creation
 * @param {string} to - Customer phone number (e.g. 0771234567)
 * @param {string} name - Customer name
 */
export const sendAccountCreationWhatsApp = async (to, name) => {
  try {
    // Format phone number for WhatsApp
    const formattedPhone = `whatsapp:+94${to.replace(/^0/, "")}`;

    const message = `👋 Hi ${name}! 🎉\n\nWelcome to *Shashindu Stores* 🏪\n\nYour customer account has been successfully created ✅\n\nWe're thrilled to have you with us! 💚\n\nEnjoy a smooth and smart shopping experience at Shashindu Stores. 🛍️`;

    await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Sandbox number
      to: formattedPhone,
    });

    console.log(`WhatsApp message sent to ${formattedPhone}`);
  } catch (error) {
    console.error(`Failed to send WhatsApp message:`, error.message);
  }
};
