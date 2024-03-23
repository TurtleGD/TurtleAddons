import "./features/discord/discord.js";
import "./features/dungeons/dragonSkip.js";
import "./features/dungeons/earlyP2.js";
import "./features/dungeons/maskTimers.js";
import "./features/dungeons/ragTimer.js";
import "./features/dungeons/relicWaypoints.js";
import "./features/dungeons/roomMessage.js";
import "./features/dungeons/terminals.js";
import "./features/dungeons/ultAlert.js";
import "./features/fishing/underground.js";
import "./features/general/kickedTimer.js";
import "./features/general/levelUp.js";
import "./features/general/petXP.js"
import "./features/kuudra/avgPre.js";
import "./features/kuudra/chunkAlert.js";
import "./features/kuudra/partyDps.js";
import "./features/kuudra/stunTimer.js";
import "./features/kuudra/rendAlert.js";
import "./features/kuudra/trueHpDisplay.js";
import "./features/kuudra/waypoints.js";
import "./features/partyCommands/instanceCommands.js";
import "./features/partyCommands/leaderCommands.js"
import "./features/slayers/rareDrops.js";
import "./features/slayers/infernoDemonlord.js";
import "./features/slayers/bossTime.js";
import settings from './settings';
import axios from '../axios';
import { AQUA, WHITE, UNDERLINE, BOLD, RESET } from './utils/formatting.js';

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
            ChatLib.chat(`${AQUA + BOLD}/avgpre ${RESET + WHITE}- View average placement times of first and second pres.`);
            ChatLib.chat(`${AQUA + BOLD}/f[1-7] ${RESET + WHITE}- Enter Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA + BOLD}/m[1-7] ${RESET + WHITE}- Enter Master Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA + BOLD}/t[1-5] ${RESET + WHITE}- Enter Kuudra tiers 1-5.`);
            ChatLib.chat(`${AQUA + BOLD}/checkunderground [distance] ${RESET + WHITE}- Checks if you get fishing speed nerf in blocks around you and makes an overlay.`);
            ChatLib.chat(`${AQUA + BOLD}/clearunderground ${RESET + WHITE}- Clears the block overlays.`);
            ChatLib.chat('');
            break;
        case 'changelog':
        case 'changelogs':
            axios.get('https://chattriggers.com/api/modules/1882')
                .then(response => {
                    ChatLib.chat('');
                    ChatLib.chat(`${AQUA + BOLD + UNDERLINE}Latest Changelog:`);
                    ChatLib.chat('');
                    ChatLib.chat(response.data.releases[0].changelog);
                })
                .catch(error => {
                    ChatLib.chat(error);
                    console.log(error);
                });
            break;
    }
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');

register('command', () => {
    ChatLib.simulateChat(Player.getHeldItem()?.getNBT());
}).setName('getnbt');


// Instance commands
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


// Testing don't run dumb shit
register('command', (arg) => {
    try {
        eval(arg)
    } catch (error) {
        ChatLib.chat(error)
        console.log(error)
    }
}).setName('runcode')
