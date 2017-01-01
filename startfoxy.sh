#!/bin/bash
if [[ $(screen -ls|grep foxybot) == "" ]]
then
    screen -L -dmS foxybot node pong.js
    echo "Bot has been started!"
else
    echo "Bot already running!"
    exit 1
fi
exit 0

