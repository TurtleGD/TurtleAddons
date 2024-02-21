import settings from './settings';
import axios from '../axios';
import "./features/kuudra";
import "./features/slayers";
import "./features/dungeons";
import "./features/discord";
import "./features/general";
import { AQUA, WHITE, UNDERLINE, BOLD, RESET } from './exports';

register('command', (arg) => {
    if (arg == undefined) settings.openGUI();
    if (arg == 'help') {
        ChatLib.chat(`${AQUA + BOLD + UNDERLINE}Commands:`);
        ChatLib.chat('');
        ChatLib.chat(`${AQUA + BOLD}/turtleaddons, /ta, /turtle, /8joh, /joh ${RESET + WHITE}- Open settings.`);
        ChatLib.chat(`${AQUA + BOLD}/getnbt ${RESET + WHITE}- Send NBT data of held item into chat. Open '/ct console' to get color codes.`);
        ChatLib.chat(`${AQUA + BOLD}/gummy ${RESET + WHITE}- See remaining duration of smoldering polarization.`);
    }    ;
    if (arg == 'changelog') {
        axios.get('https://chattriggers.com/api/modules/1882').then(response => {if (response.data.releases[0].releaseVersion != JSON.parse(FileLib.read("TurtleAddons", "metadata.json")).version){
        ChatLib.chat(`${BOLD + UNDERLINE}Changelog:`);
        ChatLib.chat('');
        ChatLib.chat(response.data.releases[0].changelog);
        }});
    };
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');

register('command', () => {
    ChatLib.simulateChat(Player.getHeldItem()?.getNBT());
}).setName('getnbt');
