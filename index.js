const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running 24/7 successfully!');
});

app.listen(PORT, () => {
    console.log(`Web server is online on port ${PORT}`);
});

const botOptions = {
    host: 'FAM_MC.aternos.me', 
    port: 25565,
    username: 'Aternos_King_Bot', 
    version: '1.21.1'
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log('Bot logged in successfully!');
        
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
                "Bot is guarding the server 24/7",
                "Server stay online script active",
                "Keep up the good work everyone"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            bot.chat(randomMessage);
        }, 300000); 
    });

    bot.on('end', () => {
        console.log('Connection lost! Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('Error encountered: ', err);
    });
}

createBot();
