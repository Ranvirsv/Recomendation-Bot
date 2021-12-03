const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const axios = require('axios').default;

client.login("OTA1NjE0OTM2NjY1OTE1NDMy.YYMpog.QWWVpaOpIV6UInXKeeu5KcpRlO8");

client.on('ready', () => {
    console.log('Hello There!')

    const statusList = ['WATCHING, Shang-Chi', 'PLAYING, Minecraft', 'PLAYING, Assasin\'s Creed', 'WATCHING, Sherlock',
                        'PLAYING, Apex', 'PLAYING, Valorant', 'LISTENING, Spotify'];

    setInterval(() => {
        const random = statusList[Math.floor(Math.random(statusList.length) * statusList.length)].split(', ');
        const status = random[1];
        const mode = random[0];
        client.user.setActivity(status, {type: mode});
    }, 60000)
});

client.on('messageCreate', (msg) => {
    if(msg.content === 'ping'){
        msg.reply({
            content: 'pong'
        });
    }
    else if(msg.content === 'ding'){
        msg.reply({
            content: 'dong'
        });
    }
    else if(msg.content === '/recomend'){
        msg.reply({
            content: 'Enter a genre.'
        })

        client.on('messageCreate', (genre) => {
            if(genre.content !== 'Enter a genre.'){
                axios.get(`https://imdb-api.com/en/API/SearchAll/k_1jeljn7h/${genre}`)
                .then((res) => {
                    const index = Math.floor(Math.random() * res.data.results.length);
                    console.log(res.data.results[index].title);
                })
                .catch((err) => {
                    console.log('ERR', err);
                });
            }
        })
    }
    else if(msg.content === '/movies250'){
        axios.get('https://imdb-api.com/en/API/Top250Movies/k_1jeljn7h')
        .then((res) => {
            const index = Math.floor(Math.random() * res.data.items.length)
            console.log('RES', res.data.items[index]);
            msg.channel.send(res.data.items[index].fullTitle)
            msg.channel.send(res.data.items[index].image)
            msg.channel.send({
                content: `Imdb rating: ${res.data.items[index].imDbRating}`
            })
        })
        .catch((err) => {
            console.log('ERR', err);
        });
    }
    else if(msg.content === '/tv250'){
        axios.get('https://imdb-api.com/en/API/Top250TVs/k_1jeljn7h')
        .then((res) => {
            const index = Math.floor(Math.random() * res.data.items.length)
            console.log('RES', res.data.items[index])
            msg.channel.send(res.data.items[index].fullTitle)
            msg.channel.send(res.data.items[index].image)
            msg.channel.send({
                content: `Imdb rating: ${res.data.items[index].imDbRating}`
            })
        })
        .catch((err) => {
            console.log('ERR', err);
        });
    }
});