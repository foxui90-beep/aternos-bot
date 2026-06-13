const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('البوت الاحترافي يعمل بنجاح 24/7 دون انقطاع!');
});
app.listen(PORT, () => {
    console.log(`Web server is online and running on port ${PORT}`);
});

const botOptions = {
    host: 'ضع_هنا_رابط_السيرفر.aternos.me', 
    port: 25565,
    username: 'Aternos_King_Bot', 
    version: '1.20.1' 
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log('تم دخول البوت إلى السيرفر بنجاح!');
        setInterval(() => {
            if (!bot) return;
            bot.look(Math.random() * 360, (Math.random() * 40) - 20); 
            bot.setControlState('forward', true);
            setTimeout(() => {
                if (bot) bot.setControlState('forward', false);
            }, 1000);
        }, 30000); 

        setInterval(() => {
            if (!bot) return;
            const messages = [
                "أنا هنا لحماية السيرفر 24/7!",
                "سيرفرنا لن يغلق أبداً اليوم.",
                "لا تقلقوا، البوت مستيقظ ويعمل."
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            bot.chat(randomMessage);
        }, 300000); 
    });

    bot.on('end', () => {
        console.log('انقطع الاتصال! جاري إعادة المحاولة خلال 10 ثوانٍ...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('حدث خطأ: ', err);
    });
}

createBot();
