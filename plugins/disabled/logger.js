/*
    Logger of message events (create, edit, remove)
*/

// Main module of FoxyBot
let core = undefined;

// Initialize plugin and here you can add custom Foxy's commands
function registerCommands(/*bot_commands.js module*/ foxyCore)
{
    core = foxyCore;
}

// Catch incoming messages: you can make foxy be more talkative or implement a custom command handler from the raw text
function messageIn(/*Client*/ bot, /*Message*/ message, /*bool*/ channelIsWritable)
{
    //var channel = bot.channels.get("295860232532525056");
    if(core.my_db === undefined)
        return;

    message.guild.fetchMember(message.author)
    .then(function(gotMember)
    {
        let isDM = message.channel.type !== "text";
        let myDb = core.my_db;
        let insertQuery =   "INSERT INTO foxy_message_log (guild_id, room_id, guild_name, room_name, event, author_id, is_bot, author_name, author_nick, message) "+
                            "values (" +
                            (isDM ? '0' : message.guild.id.toString()) + ", " +
                            message.channel.id.toString() + ", " +
                            myDb.escape(isDM ? message.channel.type : message.guild.name) + ", " +
                            myDb.escape(isDM ? "DM" : message.channel.name) + ", " +
                            0 + ", " +
                            message.author.id.toString() + ", " +
                            (message.author.bot ? 1 : 0) + ", " +
                            myDb.escape(message.author.username + "#" + message.author.discriminator) + ", " +
                            myDb.escape(isDM || gotMember.nickname == null ?
                                        message.author.username : gotMember.nickname) + ", " +
                            myDb.escape(message.content) +
                            ");";

        //channel.send(insertQuery).catch(core.msgSendError);

        myDb.query(insertQuery, core.errorMyDb);
    }).catch(function(err) {
        if(channelIsWritable)
            message.reply("Something weird happen! I have catched an error at myself! (error is [" + err +"])", core.msgSendError);
    });
}

function messageUpdate(/*Client*/ bot, /*Old Message*/ messageOld, /*New Message*/ message, /*bool*/ channelIsWritable)
{
    if(core.my_db === undefined)
        return;

    message.guild.fetchMember(message.author)
    .then(function(gotMember)
    {
        let isDM = message.channel.type !== "text";
        let myDb = core.my_db;
        let insertQuery =   "INSERT INTO foxy_message_log (guild_id, room_id, guild_name, room_name, event, author_id, is_bot, author_name, author_nick, message, message_old) "+
                            "values (" +
                            (isDM ? '0' : message.guild.id.toString()) + ", " +
                            message.channel.id.toString() + ", " +
                            myDb.escape(isDM ? message.channel.type : message.guild.name) + ", " +
                            myDb.escape(isDM ? "DM" : message.channel.name) + ", " +
                            1 + ", " +
                            message.author.id.toString() + ", " +
                            (message.author.bot ? 1 : 0) + ", " +
                            myDb.escape(message.author.username + "#" + message.author.discriminator) + ", " +
                            myDb.escape(isDM || gotMember.nickname == null ?
                                        message.author.username : gotMember.nickname) + ", " +
                            myDb.escape(message.content) + ", " +
                            myDb.escape(messageOld.content) +
                            ");";

        myDb.query(insertQuery, core.errorMyDb);
    }).catch(function(err) {
        if(channelIsWritable)
            message.reply("Something weird happen! I have catched an error at myself! (error is [" + err +"])", core.msgSendError);
    });
}

// Catch the newbie joining
function guildMemberAdd(/*Client*/ bot, /*GuildMember*/ guildMember)
{
    guildMember.guild.fetchMember(guildMember.user)
    .catch(function(err)
    {
        //if(channelIsWritable)
        //    message.reply("Something weird happen! I have catched an error at myself! (error is [" + err +"])", core.msgSendError);
    });
}

function messageDelete(/*Client*/ bot, /*Message*/ message, /*bool*/ channelIsWritable)
{
    if(core.my_db === undefined)
        return;

    message.guild.fetchMember(message.author)
    .then(function(gotMember)
    {
        let isDM = message.channel.type !== "text";
        let myDb = core.my_db;
        let insertQuery =   "INSERT INTO foxy_message_log (guild_id, room_id, guild_name, room_name, event, author_id, is_bot, author_name, author_nick, message) "+
                            "values (" +
                            (isDM ? '0' : message.guild.id.toString()) + ", " +
                            message.channel.id.toString() + ", " +
                            myDb.escape(isDM ? message.channel.type : message.guild.name) + ", " +
                            myDb.escape(isDM ? "DM" : message.channel.name) + ", " +
                            2 + ", " +
                            message.author.id.toString() + ", " +
                            (message.author.bot ? 1 : 0) + ", " +
                            myDb.escape(message.author.username + "#" + message.author.discriminator) + ", " +
                            myDb.escape(isDM || gotMember.nickname == null ?
                                        message.author.username : gotMember.nickname) + ", " +
                            myDb.escape(message.content) +
                            ");";

        myDb.query(insertQuery, core.errorMyDb);
    }).catch(function(err){
        if(channelIsWritable)
            message.reply("Something weird happen! I have catched an error at myself! (error is [" + err +"])", core.msgSendError);
    });
}

module.exports =
{
    // Initialize plugin and here you can add custom Foxy's commands
    registerCommands:   registerCommands,
        // Catch the newbie joining
    guildMemberAdd:     guildMemberAdd,
    // Catch incoming messages: you can make foxy be more talkative or implement a custom command handler from the raw text
    messageIn:          messageIn,
    messageUpdate:      messageUpdate,
    messageDelete:      messageDelete
};

