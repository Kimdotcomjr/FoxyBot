/*
    Foxy can speak any language and can help you spean with anyone!
 */

var YandexTranslator = require('yandex.translate');

// Translator instance
var translator = undefined;

// Main module of FoxyBot
var core = undefined;

//var langReg = new RegExp("/^\[([a-z]){2}\&]/ig", "ig");
function isLanguage(word)
{
    return /^\[([a-z]){2}\]$/ig.test(word.trim());
}

var langChannels = require("./linguist_fox_channel_langs.json");

var translate = function(bot, message, args)
{
    var phraze = { orig: args, res: "..."};
    var arg1 = core.cutWord(phraze);
    if(!isLanguage(arg1))
    {
        //Detect channel specific language
        var chID = message.channel.id;
        if(langChannels[chID] != undefined)
            arg1 = langChannels[chID];
        else
            arg1 = 'en';
        phraze.res = phraze.orig;
        core.foxylogInfo("-> Using channel language...");
    }
    else
    {
        arg1 = arg1.substr(1, 2);
    }

    if(phraze.res == "")
    {
        message.reply("Can't translate nothing!");
        return;
    }

    core.foxylogInfo("-> Translate into " + arg1 + " the phraze " + phraze.res);
    translator.translate(phraze.res, arg1)
    .then(function(translation)
    {
        core.foxylogInfo(translation);
        if(message.editable)
        {
            message.edit(translation);
        } else {
            core.say(bot, message,  "<@!" + message.author.id + ">: " + translation);
        }
    },
    function(fail)
    {
        message.reply("Can't translate: " + fail, core.msgSendError);
    }).catch(core.msgSendError);
}

// Initialize plugin and here you can add custom Foxy's commands
function registerCommands(/*bot_commands.js module*/ foxyCore)
{
    core = foxyCore;
    translator = new YandexTranslator(core.botConfig.trkey);

    core.addCMD(["tr",       translate,   "Хочешь говорить на другом языке?\n"+
                                          "I'll translate your phrase into any language you want\n\n"+
                                          "__*Syntax:*__:\n\n"+
                                          " **/foxy tr [de] __Please, help me find my street!__**\n" +
                                          "__Translate phrase to any language you want. In this example translate phrase into German__\n\n" +
                                          " **/foxy tr __Я говорю по-немецки!__**\n" +
                                          "__Automatically detect language of channel and translate to that language__\n\n" +
                                          "Language of source phrase will be detected automatically.", [], true]);
}

module.exports =
{
    registerCommands:   registerCommands,
};
