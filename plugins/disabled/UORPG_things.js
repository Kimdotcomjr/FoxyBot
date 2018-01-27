/*
    A small plugin made for especially for UORPG chat server
*/

var core = undefined;

var UORPG_Server = "177730395352072192";

var Chan_RUS = "203294045689217024";
var Chan_ENG = "199908461549584384";
var Chan_LAT = "369616743200456715";

function isRussian(chan)
{
    return (chan.id == Chan_RUS);
}

function getChaos(guild)
{
    return guild.roles.find('name', 'Chaos');
}

function getOrder(guild)
{
    return guild.roles.find('name', 'Order');
}

function getRenegades(guild)
{
    return guild.roles.find('name', 'Renegades');
}

var getKeys = function(obj)
{
    var keys = "";
    for(var key in obj)
    {
        keys += key + "; ";
    }
    return keys;
}

var cleanRoles = function(bot, message, args)
{
    var chaos = getChaos(message.guild);
    var order = getOrder(message.guild);
    var renegades = getRenegades(message.guild);
    var member = message.member;
    var mKeys = getKeys(member);
    if(mKeys != "")
    {
        member.removeRole(order);
        member.removeRole(chaos);
        member.removeRole(renegades);
    }
    else
    {
        message.reply("Something weird happen! I can't clean-up old roles! (type of member is " + typeof(member) + " and it has inside: [" + mKeys + "])", core.msgSendError);
    }
}

var joinOrder = function(bot, message, args)
{
    cleanRoles(bot, message, args);
    var order = getOrder(message.guild);
    var member = message.member;
    member.addRole(order);
    message.reply("Welcome to Order!", core.msgSendError);
}

var joinChaos = function(bot, message, args)
{
    cleanRoles(bot, message, args);
    var chaos = getChaos(message.guild);
    var member = message.member;
    member.addRole(chaos);
    message.reply("Welcome to Chaos!", core.msgSendError);
}

var joinRenegades = function(bot, message, args)
{
    cleanRoles(bot, message, args);
    var renegades = getRenegades(message.guild);
    var member = message.member;
    member.addRole(renegades);
    message.reply("Welcome to Renegades!", core.msgSendError);
}

var crystalPhase = function(bot, message, args)
{
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(2017,11,2);//Точка отсчёта чётности
    var secondDate = new Date();

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

    var rus = bot.channels.get(Chan_RUS);
    var lat = bot.channels.get(Chan_LAT);
    //var eng = bot.channels.get(Chan_ENG);

    var crystal_peace;
    var crystal_war;

    if(message.channel.id == rus.id)
    {
        crystal_peace = "# Кристал в мирной проекции мира.";
        crystal_war = "# Кристал в боевой проекции мира.";
    }
    else if(message.channel.id == lat.id)
    {
        crystal_peace = "# Kristāls ir pasaules mierā projekcijā.";
        crystal_war = "# Kristāls ir pasaules karā projekcijā.";
    }
    else
    {
        crystal_peace = "# The Crystal is in the peace projection of the world.";
        crystal_war = "# The Crystal is in the war projection of the world.";
    }

    if((diffDays % 2) == 0)
        message.channel.send(crystal_peace).catch(core.msgSendError);
    else
        message.channel.send(crystal_war).catch(core.msgSendError);
}


function registerCommands(foxyCore)
{
    core = foxyCore;
    core.addCMD(["order",      joinOrder,           "Join The Order Alliance - Holy Empire and Insurgents!!!", [], true, [UORPG_Server] ]);
    core.addCMD(["chaos",      joinChaos,           "Join The Chaos Alliance - Army of Darkness and The Shadows!!!", [], true, [UORPG_Server] ]);
    core.addCMD(["renegades",  joinRenegades,       "Join Renegades - traitors and outcasts; players without alliance.", [], true, [UORPG_Server] ]);
    core.addCMD(["crystal",    crystalPhase,        "Show projection where crystal is located", [], true, [UORPG_Server] ]);
}

function guildMemberAdd(bot, guildMember)
{
    // console.log("Кто-то новенький! " + guildMember.user.id +
    // " на серваке " + guildMember.guild.id + " == " + UORPG_Server);
    if(guildMember.guild.id == UORPG_Server)
    {
        var ru = bot.channels.get(Chan_RUS);
        var en = bot.channels.get(Chan_ENG);

        var message_ru =
            "<@" + guildMember.user.id +">, Приветствуем вас на сервере Ultima Online - UORPG.net!\n\n" +
            "Выберите вашу фракцию:\n" +
            "Альянс Порядок - Священная Империя и Повстанцы\n" +
            "Альянс Хаос - Армия Тьмы и Тени\n" +
            "Ренегаты - предатели и отступники, войны без альянса.\n\n" +
            "Для того, чтобы выбрать вашу сторону в войне напишите в чате: /foxy order, /foxy chaos или /foxy renegades";
        var message_en =
            "<@" + guildMember.user.id +">, Hi, welcome to Ultima Online server - UORPG.net!\n\n" +
            "Assign your faction please:\n" +
            "The Order Alliance - Holy Empire and Insurgents\n" +
            "The Chaos Alliance - Army of Darkness and The Shadows\n"+
            "The Renegades - traitors and outcasts; players without alliance.\n\n"+
            "In order to confirm your war force, type: /foxy order ; /foxy chaos ;  /foxy renegades";

        ru.send(message_ru).catch(core.msgSendError);
        en.send(message_en).catch(core.msgSendError);
    }
}

module.exports =
{
    registerCommands:   registerCommands,
    guildMemberAdd:     guildMemberAdd
};
