
var core = undefined;


var dance = function(bot, message, args)
{
    message.channel.sendFile(__dirname + "/../images/dance.gif").catch(msgSendError);
}

var drill = function(bot, message, args)
{
    message.channel.sendFile(__dirname + "/../images/drill.gif").catch(msgSendError);
}

var imgSOS = function(bot, message, args)
{
    message.channel.sendFile(__dirname + "/../images/SOS.gif").catch(msgSendError);
}

var foxFace = function(bot, message, args)
{
    message.channel.sendMessage("http://wohlsoft.ru/images/foxybot/fox_face.png", msgSendError);
}



function registerCommands(foxyCore)
{
    core = foxyCore;
    core.addCMD(["dance",    dance,            "Let's dance!!!"]);
    core.addCMD(["drill",    drill,            "Wanna drill hole?"]);
    core.addCMD(["sos",      imgSOS,           "HELP ME!!!"]);
    core.addCMD(["foxface",  foxFace,          "Wanna my face?"]);
}

module.exports =
{
    registerCommands:   registerCommands
};


