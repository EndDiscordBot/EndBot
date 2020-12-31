const Discord = require('discord.js');

const client = new Discord.Client();

const randomPuppy = require('random-puppy');

const prefix = "e!"

client.once('ready', () => {
    console.log('End utility bot is online (Dont share token)');
    // sets the game activity, don't touch
    client.user.setActivity("e!info", {
        type: "PLAYING",
      });
});


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let user = message.author;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
        message.channel.send('Pong!');
    } else if (command === 'info') {;
        message.channel.send('End utility bot Created by EndGaming10');
    } else if (command === 'help') {
        const helpEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Help')
	        .setAuthor('End utility bot')
	        .setDescription('The help page of End utility bot')
	        .addFields(
		        { name: '\u200B', value: '\u200B' },
		        { name: 'eb!ping', value: 'A test'},
                { name: 'eb!about', value: 'Information about our bot'},
                { name: 'eb!avatar', value: 'Shows you the avatar of yourself, or others!'}
	        )
	        .addField('eb!info', 'information about the bot', true)
	        .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)

        message.channel.send(helpEmbed);
    } else if (command === 'about') {
        message.channel.send("End utility bot is a Discord bot for the Endly Network.\nThe Endly Bot is meant to make it easier for staff and users\nTo navigate the server.")
    } else if (command === 'test') {
        message.channel.send('test successful!');
        console.log(`Test successfully run by ${user.username}!`);
        // Moderation commands
    } else if (command === 'ban') {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid Permissions")
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("Invalid User")
        if (User.hasPermission("BAN_MEMBERS")) return message.reply("Invalid Permissions")
        let banReason = args.join(" ").slice(22);
        if (!banReason) {
            banReason = "None"
}

        User.ban({reason: banReason})
        const banned = message.mentions.members.first();
        const banembed = new discord.MessageEmbed()
        .setTitle(person.username + " got banned by " + message.author.username)
        message.channel.send(banembed)
        message.channel.send(`Successfully banned ${banned}!`);
        console.log(`${banned.username} was Banned by ${user.username} (Check bans)`)
    } else if(command === "kick"){ //kick command
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Invalid Permissions")
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("Invalid User")
        let banReason = args.join(" ").slice(22);
        if (!banReason) {
        banReason = "None"
        }
        User.kick({reason: banReason})
        const person = message.mentions.users.first()
        const kickembed = new discord.MessageEmbed()
            .setTitle(person.username + " got kicked by " + message.author.username)
        message.channel.send(kickembed)
        console.log(`${person.username} Was kicked by ${user.username} for ${banReason}`)
    } else if (command === "clear") { // Thanks to Gilles Heinesch For making this clear command
        const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
        const amount = args.join(' '); // Amount of messages which should be deleted

        if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
        if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error

        if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
        if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

        await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
            message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
        )});
        console.log(`${user.username} Successfully cleared ${amount} messages.`);
        message.channel.send(`Successfully cleared ${amount} messages!`)
        .then(msg => {
            msg.delete({ timeout: 3000 })
          })
          .catch(console.error);
        }else if(command === "rtest"){
            message.react('👍');

        // Fun or Game commands
        } else if(command === "avatar"){
            if (!message.mentions.users.size) {
                const selfav = new Discord.MessageEmbed() 
                .setTitle("Your avatar")
                .setAuthor("End utility bot")
                .setImage(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`) // Translates the URL of someones avatar into a PNG image
                .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
                return message.channel.send(selfav);
              }
            const avatarList = message.mentions.users.map(user => { //Checks if the message contains a ping
                const otherav =  new Discord.MessageEmbed()
                .setTitle(`${user.username}`)
                .setAuthor("End utility bot")
                .setImage(`${user.displayAvatarURL({ format: "png", dynamic: true })}`)
                .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
                return message.channel.send(otherav);
            })
        } else if(command === "say"){
            if(!args.length){
                const saylength = new Discord.MessageEmbed()
                .setColor('#e01d1d')
                .setTitle(`Provide me with something to say, ${message.author.username}!`)
                .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
                return message.channel.send(saylength);
            }
            const sayEMB = new Discord.MessageEmbed()
                    .setColor('#34eb46')
                    .setTitle(`${args.slice(0).join(' ')}`)
                    .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
            message.channel.send(sayEMB);
        }else{
                const unknownCMD = new Discord.MessageEmbed() 
                        .setColor('#FF0000')
                        .setTitle("Unknown Command!")
                        .setAuthor("End utility Bot")
                        .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5i8kIbD92lbhq5G48L9cbdinetvQy-W7XQ&usqp=CAU")
                        .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
                message.channel.send(unknownCMD);
              }
});



