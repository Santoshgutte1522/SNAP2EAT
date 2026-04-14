import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";

const isProduction = process.env.NODE_ENV === "production";

// 1. Initialize the WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth(), // Saves your login session locally
  puppeteer: {
    // Crucial for 4GB RAM: Points to your existing Chrome
    executablePath: isProduction
      ? null
      : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  },
});

// 2. Generate QR Code in VS Code Terminal
client.on("qr", (qr) => {
  console.log("--- SCAN THIS QR WITH YOUR WHATSAPP ---");
  qrcode.generate(qr, { small: true });
});

// 3. Confirm Connection
client.on("ready", () => {
  console.log("WhatsApp Bot is Ready and Online! ✅");
});

// 4. Initialize the connection
client.initialize();

export const sendWhatsAppReminder = async (userName, task, userPhone) => {
  try {
    // 1. Remove everything except numbers (strips +, spaces, dashes)
    let cleanNumber = userPhone.toString().replace(/\D/g, "");

    // 2. Add India country code (91) if it's a 10-digit number
    if (cleanNumber.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }

    // 3. Final format for the library
    const chatId = `${cleanNumber}@c.us`;

    console.log(`Sending message to: ${chatId}`);

    const messageBody = `Hi ${userName}! 🥗\n\n*SNAP2EAT Reminder:*\n${task}\n\nStay disciplined! 💪`;

    await client.sendMessage(chatId, messageBody);
    console.log(`✅ Message sent to ${userName}`);
  } catch (error) {
    console.error("❌ WhatsApp Service Error:", error.message);
    throw error; // This helps the controller see the error
  }
};
