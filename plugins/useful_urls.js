
var core = undefined;

var testUrl = function(bot, message, args)
{
    message.channel.send("http://wohlsoft.ru").catch(core.msgSendError);
}

var lab = function(bot, message, args)
{
    message.channel.send("http://wohlsoft.ru/docs/_laboratory/").catch(core.msgSendError);
}

var smbx2pgeUpdate = function(bot, message, args)
{
    message.channel.send("http://wohlsoft.ru/forum/viewtopic.php?f=11&t=1977").catch(core.msgSendError);
}

var repo = function(bot, message, args)
{
    message.channel.send("https://github.com/WohlSoft/PGE-Project").catch(core.msgSendError);
}

var markup = function(bot, message, args)
{
    message.channel.send("https://support.discordapp.com/hc/en-us/articles/210298617").catch(core.msgSendError);
}

function isURL(str)
{
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/30229098
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-zA-Z\\:\\(\\)\\d%_.~+]*)*' + // port and path
    '(\\?[;&A-Za-z\\d%\\:\\(\\)_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locater
    if(!pattern.test(str))
    {
        return false;
    }
    else
    {
        return true;
    }
}

var isUrlCheck = function(bot, message, args)
{
    message.channel.send("Your string [" + args + "] is " + (isURL(args) ? "a valid" : "NOT an" ) + " URL!").catch(core.msgSendError);
}


function registerCommands(foxyCore)
{
    core = foxyCore;
    core.addCMD(["testurl",  testUrl,          "Test of URL returning. Just return a WohlSoft site url!"]);
    core.addCMD(["lab",      lab,              "Returns PGE Laboratory URL"]);
    core.addCMD(["s2p",      smbx2pgeUpdate,   "Returns URL to PGE update guide for SMBX 2"]);
    core.addCMD(["repo",     repo,             "Returns URL to PGE repository on GitHub"]);
    core.addCMD(["markup",   markup,           "Returns URL for a Discord markdown guide"]);
    core.addCMD(["isurl",    isUrlCheck,       "Checks is given string an URL", [], true]);
    core.isurl = isURL; //Public this function!
}

module.exports =
{
    registerCommands:   registerCommands
};
