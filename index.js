const TelegramBot = require('node-telegram-bot-api');

const token = '8086248327:AAGJ4QLgpviz7HTz7xfuPT7RQy1jHZdQM8g';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  const welcomeMessage = `
*NADA777 Admin Bot* 🤖
Selamat Datang ${name} di *NADA777*! 🃏


🧠 Gunakan bot ini untuk:
🔗 Mendapatkan Link Login/Daftar
🎁 Cek Promo & Bonus Member Baru
🎯 Bocoran Slot RTP Gacor Hari Ini
📲 Download APK Resmi NADA77

🎯 Keunggulan Kami:
✅ Sistem permainan terpercaya
🎁 Bonus harian dan event eksklusif untuk member
💬 Customer service aktif & siap bantu 24 jam nonstop

Ketik /menu untuk mulai atau pilih tombol di bawah ini untuk akses cepat!
`;

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: ' Login', url: 'https://daftarnada.com' }],
        [{ text: ' Link Alternatif', url: 'https://t.ly/nada777akses' }],
        [
          { text: '📞 Hubungi CS', url: 'https://t.me/nada777Official' },
          { text: '👥 Grup Resmi ', url: 'https://t.me/slotgacornada777' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    reply_markup: {
      keyboard: [
        ['📱 Unduh APK Resmi NADA777'],
        ['🎁 Lihat Promo & Bonus Terbaru'],
        ['🎯 Cek Bocoran Slot Gacor Hari Ini']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };

  bot.sendMessage(chatId, 'Pilih salah satu menu di bawah ini:', keyboard);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (text.includes('bocoran') || text.includes('rtp')) {
    bot.sendMessage(chatId, '📊 Bocoran Slot Gacor Hari Ini:\nhttps://t.ly/Nada777RTP');
  } else if (text.includes('promo') || text.includes('bonus')) {
    bot.sendMessage(chatId, '🎁 Promo Hari Ini:\nhttps://t.ly/promonada777');
  } else if (text.includes('login') || text.includes('daftar') || text.includes('apk')) {
    bot.sendMessage(chatId, '📱 Download APK & Daftar:\nhttps://t.ly/APKNADA');
  }
});


