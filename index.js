const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '8086248327:AAGJ4QLgpviz7HTz7xfuPT7RQy1jHZdQM8g';
const bot = new TelegramBot(token, { polling: true });

const userFile = 'users.json';

function saveUser(id) {
  let users = [];
  if (fs.existsSync(userFile)) {
    users = JSON.parse(fs.readFileSync(userFile));
  }
  if (!users.includes(id)) {
    users.push(id);
    fs.writeFileSync(userFile, JSON.stringify(users));
  }
}

function broadcastDailyMessage() {
  if (!fs.existsSync(userFile)) return;

  const users = JSON.parse(fs.readFileSync(userFile));
  const message = `💡 *Tip Harian:*

Manfaatkan bonus dan promosi yang Kami tawarkan.`;
  
  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🌐 LINK GACOR', url: 'https://daftarnada.com' }],
        [{ text: '⚡ PROMO Nada777', url: 'https://t.ly/promonada777' }],
        [{ text: '💬 CS ONLINE 24 JAM', url: 'https://t.me/nada777Official' }],
        [{ text: '🏛️ INFO GAME & POLA GACOR', url: 'https://t.ly/Nada777RTP' }]
      ]
    }
  };

  users.forEach(id => {
    bot.sendMessage(id, message, options).catch(() => {});
  });

  console.log('📤 Broadcast harian terkirim!');
}

function scheduleDaily(hour, minute) {
  const now = new Date();
  const target = new Date();

  target.setHours(hour);
  target.setMinutes(minute);
  target.setSeconds(0);

  if (target < now) target.setDate(target.getDate() + 1);
  const delay = target - now;

  setTimeout(() => {
    broadcastDailyMessage();
    setInterval(broadcastDailyMessage, 24 * 60 * 60 * 1000);
  }, delay);
}

// Jadwalkan broadcast harian jam 10:00
scheduleDaily(10, 0);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  saveUser(chatId);

  const welcomeMessage = `
*NADA777 Admin Bot* 🤖
Selamat Datang ${name} di *NADA777*! 🃏

🧠 Gunakan bot ini untuk:
🔗 Mendapatkan Link Login/Daftar
🎁 Cek Promo & Bonus Member Baru
🎯 Bocoran Slot RTP Gacor Hari Ini
📲 Download APK Resmi NADA777

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
        [{ text: '🔐 Login', url: 'https://daftarnada.com' }],
        [{ text: '🌐 Link Alternatif', url: 'https://t.ly/nada777akses' }],
        [
          { text: '📞 Hubungi CS', url: 'https://t.me/nada777Official' },
          { text: '👥 Grup Resmi', url: 'https://t.me/slotgacornada777' }
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
  const text = msg.text?.toLowerCase() || '';

  if (text.includes('bocoran') || text.includes('rtp')) {
    bot.sendMessage(chatId, '📊 Bocoran Slot Gacor Hari Ini:\nhttps://t.ly/Nada777RTP');
  } else if (text.includes('promo') || text.includes('bonus')) {
    bot.sendMessage(chatId, '🎁 Promo Hari Ini:\nhttps://t.ly/promonada777');
  } else if (text.includes('login') || text.includes('daftar') || text.includes('apk')) {
    bot.sendMessage(chatId, '📱 Download APK & Daftar:\nhttps://t.ly/APKNADA');
  } else if (!text.startsWith('/')) {
    const replyMessage = `
Halo saya hanya robot 🤖
Jika kamu ingin bertanya, langsung klik tombol *LiveChat* di bawah ini ya.  
Dan jika ingin bermain tanpa blokir, bisa langsung lewat tombol *LOGIN* bosku 🎲
`;

    const options = {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏛️ LIVECHAT NADA777', url: 'https://t.ly/Nada777LC' }]
        ]
      }
    };

    setTimeout(() => {
      bot.sendMessage(chatId, replyMessage, options);
    }, 1000);
  }
});
