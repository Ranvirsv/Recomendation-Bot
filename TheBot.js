// ------------------------------------------------------------------------
// *NOTE*: all of the console.log commands in the code are just for testing
// ------------------------------------------------------------------------

const Discord = require("discord.js");
// install discord.js using the command: npm install discord.js
// NOTE: discord.js only works with latest node.js, so be sure to update node.js
// or download it if you haven't already.

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const axios = require('axios').default;
// you need to install axios first
// use the command npm install axios in the terminal

client.login(process.env.TOKEN);
// you need to put your discord bot token in the env file
// or just plase the token in the cliennt.login("...") as a string

client.on('ready', () => {
    console.log('Hello There!')

    const statusList = ['WATCHING, Shang-Chi', 'PLAYING, Minecraft', 'PLAYING, Assasin\'s Creed', 'WATCHING, Sherlock',
                        'PLAYING, Apex', 'PLAYING, Valorant', 'LISTENING, Spotify'];

    setInterval(() => {
        const random = statusList[Math.floor(Math.random(statusList.length) * statusList.length)].split(', ');
        // chosses a random status form the status list and splits it into two words, the status and the type.
        const status = random[1];
        const mode = random[0];
        client.user.setActivity(status, {type: mode});
    }, 60000)
});

client.on('messageCreate', (msg) => {

    let command = msg.content.split('/');
    // the the command message into two words using the split command to be processed differently.
   
    console.log(command);
    console.log(command[0]);
    console.log(command[1]);

    if(msg.content === '/ping'){
        msg.reply({
            content: 'pong'
        });
    }
    else if(msg.content === '/ding'){
        msg.reply({
            content: 'dong'
        });
    }
    else if(command[0] === 'rec'){

        axios.get(`https://imdb-api.com/en/API/Keyword/k_eggvdssr/${command[1]}`)
        // gets the all the media form the imdb data base, i.e movies or series, with that specific keyword
        // the keywords are not genres so you can not use horror, comedy, romance etc.
        // the keywords can be love, scary, ghost, dramas etc.
        .then((res) => {

            if(res.data.items.length > 0){
                const index = Math.floor(Math.random() * res.data.items.length);
                // choses a random number between 0 and the length of the items in the data of the responce we got.
                const reply = res.data.items[index];
                
                msg.channel.send(reply.title);
                
                if(res.data.items[index].image === ''){
                    msg.channel.send({
                        content: 'No image found'
                    });
                }
                else {
                    msg.channel.send(reply.image);
                }

                msg.channel.send({
                    content: `Imdb rating: ${reply.imDbRating}`
                });
            }
            else{
                msg.channel.send('Keyword not accepted, try something else.')
            }
            console.log('RES', reply);
        })
        .catch((err) => {
            console.log('ERR', err);
        });
    }
    else if(command[0] === 'rec250'){
        axios.get(`https://imdb-api.com/en/API/Top250${command[1]}/k_eggvdssr`)
        // gets the specific media form the imdb data base, i.e movies or series.
        .then((res) => {
            const index = Math.floor(Math.random() * res.data.items.length)
            const reply = res.data.items[index];

            msg.channel.send(reply.fullTitle)
            msg.channel.send(reply.image)
            msg.channel.send({
                content: `Imdb rating: ${reply.imDbRating}`
            });

            console.log('RES', reply);
        })
        .catch((err) => {
            console.log('ERR', err);
        });
    }
    else if(command[1] === 'rec-help'){
        msg.channel.send('rec/keyword - for recommending movies and tv shows from a specific keyword');
        msg.channel.send('            - Keywords include Love, Laughter, Ghost, Dramas, etc')
        msg.channel.send('rec250/Movies - for recommending movies from top 250 imdb movie list');
        msg.channel.send('rec250/TVs - for recommending tv shows from top 250 imdb series list');
    }
    // this command, when used, helps you by presenting all the commands that you can use of the bot.
});
