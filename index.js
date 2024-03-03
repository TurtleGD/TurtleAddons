import settings from './settings';
import axios from '../axios';
import "./features/kuudra";
import "./features/slayers";
import "./features/dungeons";
import "./features/discord";
import "./features/general";
import "./features/partyCommands";
import { AQUA, WHITE, UNDERLINE, BOLD, RESET } from './exports';

register('command', (arg) => {
    switch (arg) {
        case undefined:
            settings.openGUI();
            break;
        case 'help':
            ChatLib.chat('');
            ChatLib.chat(`${AQUA + BOLD + UNDERLINE}Commands:`);
            ChatLib.chat('');
            ChatLib.chat(`${AQUA + BOLD}/ta (/turtleaddons, /turtle, /8joh, /joh) ${RESET + WHITE}- Open settings.`);
            ChatLib.chat(`${AQUA + BOLD}/ta changelog ${RESET + WHITE}- View changelog.`);
            ChatLib.chat(`${AQUA + BOLD}/getnbt ${RESET + WHITE}- Send NBT data of held item into chat. Open '/ct console' to get color codes.`);
            ChatLib.chat(`${AQUA + BOLD}/gummy ${RESET + WHITE}- See remaining duration of smoldering polarization.`);
            ChatLib.chat('');
            break;
        case 'changelog':
            axios.get('https://chattriggers.com/api/modules/1882').then(response => {if (response.data.releases[0].releaseVersion != JSON.parse(FileLib.read("TurtleAddons", "metadata.json")).version){
            ChatLib.chat(`${BOLD + UNDERLINE}Changelog:`);
            ChatLib.chat('');
            ChatLib.chat(response.data.releases[0].changelog);
            }});
            break;
        }
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');

register('command', () => {
    ChatLib.simulateChat(Player.getHeldItem()?.getNBT());
}).setName('getnbt');


['t5', 't4', 't3', 't2', 't1'].forEach((name, index) => {
    register('command', () => {
        ChatLib.command(`joininstance kuudra_${['infernal', 'fiery', 'burning', 'hot', 'normal'][index]}`);
    }).setName(name, true);
});

['m7', 'm6', 'm5', 'm4', 'm3', 'm2', 'm1'].forEach((name, index) => {
    register('command', () => {
        ChatLib.command(`joininstance master_catacombs_floor_${['seven', 'six', 'five', 'four', 'three', 'two', 'one'][index]}`);
    }).setName(name, true);
});

['f7', 'f6', 'f5', 'f4', 'f3', 'f2', 'f1'].forEach((name, index) => {
    register('command', () => {
        ChatLib.command(`joininstance catacombs_floor_${['seven', 'six', 'five', 'four', 'three', 'two', 'one'][index]}`);
    }).setName(name, true);
});
