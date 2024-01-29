import settings from "../settings";
import { isPlayerAt, createWaypoint, nearCoords } from "../exports";
import { getMatchFromLines, getScoreboard, removeUnicode } from "../../BloomCore/utils/Utils";

var startTime;
var endTime;
var timeToKill;
var counting = false;

register('worldLoad', () => {
    counting = false;
    startTime = undefined;
    endTime = undefined;
    timeToKill = undefined;
});

register('renderWorld', () => {
    if (!isPlayerAt('Kuudra')) return;

    // Etherwarp Block
    if (settings.etherwarpBlock && nearCoords(-154, 29, -172, 40)) createWaypoint(-154, 29, -172, 0, 0, 255, 0.25, 1, true);

    // Stun Block
    if (settings.stunBlock && nearCoords(-153, 31, -172, 40)) createWaypoint(-153, 31, -172, 0, 0, 255, 0.25, 1, true);
});

register("chat", (message) => {
    if (settings.partyDps && message.includes("KUUDRA DOWN!") && !message.includes(':') && removeUnicode(getMatchFromLines(/ ⏣ (.+)/, getScoreboard(false))) == "Kuudra's Hollow (T5)") {
        endTime = new Date().getTime();
        timeToKill = (endTime - startTime) / 1000;
        ChatLib.command(`pc Party True DPS: ${(300/timeToKill).toFixed(2)}m`);
    };
}).setCriteria("${message}");

register('tick', () => {
    if ((settings.partyDps && -87 > Player.getX() && Player.getX() > -118 && 32 > Player.getY() && Player.getY() > 3 && -94 > Player.getZ() && Player.getZ() > -120) && !counting) {
        startTime = new Date().getTime();
        counting = true;
    };
});
