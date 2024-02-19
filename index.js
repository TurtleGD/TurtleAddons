import settings from './settings';
import axios from '../axios';
import "./features/kuudra";
import "./features/slayers";
import "./features/dungeons";
import "./features/discord";
import "./features/general";
import { GRAY, AQUA, WHITE, UNDERLINE, BOLD, RESET } from './exports';

register('command', (arg) => {
    if (arg == undefined) settings.openGUI();
    if (arg == 'help') {
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}]`);
        ChatLib.chat('');
        ChatLib.chat(`${AQUA + BOLD}/turtleaddons, /ta, /turtle, /8joh, /joh ${RESET + WHITE}- Open settings.`);
        ChatLib.chat(`${AQUA + BOLD}/getnbt ${RESET + WHITE}- Send NBT data of held item into chat. Open '/ct console' to get color codes.`);
        ChatLib.chat(`${AQUA + BOLD}/gummy [minutes] ${RESET + WHITE}- Set smoldering polarization timer. See settings for more info.`);
    }
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');

register('command', () => {
    ChatLib.simulateChat(Player.getHeldItem()?.getNBT());
}).setName('getnbt');

// Update message
axios.get('https://chattriggers.com/api/modules/1882').then(response => {if (response.data.releases[0].releaseVersion != JSON.parse(FileLib.read("TurtleAddons", "metadata.json")).version){
    new TextComponent(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Version ${response.data.releases[0].releaseVersion} Avaliable. (${AQUA}Click to Update!${GRAY})`).setClickAction("run_command").setClickValue(`/ct load`).chat()
    ChatLib.chat('');
    ChatLib.chat(`${BOLD + UNDERLINE}Changelog:`);
    ChatLib.chat('');
    ChatLib.chat(response.data.releases[0].changelog);
}});
