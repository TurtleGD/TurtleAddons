import "./features/combat/hideCrits.js";
import "./features/combat/srbTimer.js";
import "./features/discord/discord.js";
import "./features/dungeons/deathMessage.js";
import "./features/dungeons/dragonSkip.js";
import "./features/dungeons/earlyP2.js";
import "./features/dungeons/gyroDisplay.js";
import "./features/dungeons/leapAnnounce.js";
import "./features/dungeons/maskTimers.js";
import "./features/dungeons/ragTimer.js";
import "./features/dungeons/relicWaypoints.js";
import "./features/dungeons/roomMessage.js";
import "./features/dungeons/terminals.js";
import "./features/dungeons/ultAlert.js";
import "./features/fishing/underground.js";
import "./features/general/blacklist.js";
import "./features/general/kickedTimer.js";
import "./features/general/levelUp.js";
import "./features/general/petXP.js"
import "./features/kuudra/avgPre.js";
import "./features/kuudra/chunkAlert.js";
import "./features/kuudra/partyDps.js";
import "./features/kuudra/stunDps.js";
import "./features/kuudra/stunTimer.js";
import "./features/kuudra/trueHpDisplay.js";
import "./features/kuudra/waypoints.js";
import "./features/partyCommands/instanceCommands.js";
import "./features/partyCommands/leaderCommands.js"
import "./features/slayers/rareDrops.js";
import "./features/slayers/infernoDemonlord.js";
import "./features/slayers/bossTime.js";
import settings from './settings';
import axios from '../axios';
import { AQUA, WHITE, STRIKETHROUGH, BOLD, GRAY } from './utils/formatting.js';

register('command', (arg) => {
    switch (arg) {
        case undefined:
            settings.openGUI();
            break;
        case 'help':
        case 'commands':
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons Commands${GRAY}]`));
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}General:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/ta (/turtleaddons, /turtle, /8joh, /joh) ${WHITE}- Open settings.`);
            ChatLib.chat(`${AQUA}/ta changelog ${WHITE}- View changelog.`);
            ChatLib.chat(`${AQUA}/getnbt ${WHITE}- Send NBT data of held item into chat. Open '/ct console' to get color codes.`);
            ChatLib.chat(`${AQUA}/movelobby [x/y/scale] [num] ${WHITE}- Edit Kicked To Lobby Timer.`);
            ChatLib.chat(`${AQUA}/movepetxp [x/y/scale] [num] ${WHITE}- Edit Pet XP Display.`);
            ChatLib.chat(`${AQUA}/blacklist [view/add/remove/clear] ${WHITE}- Access the party finder blacklist.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Combat:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/movesrb [x/y/scale] [num] ${WHITE}- Edit Souls Rebound Timer.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Kuudra:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/t[1-5] ${WHITE}- Enter Kuudra tiers 1-5.`);
            ChatLib.chat(`${AQUA}/avgpre ${WHITE}- View average placement times of first and second pres.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Slayers:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/movegummy [x/y/scale] [num] ${WHITE}- Edit Smoldering Polarization Display.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Dungeons:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/f[1-7] ${WHITE}- Enter Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA}/m[1-7] ${WHITE}- Enter Master Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA}/getroom ${WHITE}- Gets the current dungeon room you are in.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Fishing:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/checkunderground [distance] ${WHITE}- Checks if you get fishing speed nerf in blocks around you and makes an overlay.`);
            ChatLib.chat(`${AQUA}/clearunderground ${WHITE}- Clears the block overlays.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            break;
        case 'changelog':
        case 'changelogs':
            axios.get('https://chattriggers.com/api/modules/1882')
                .then(response => {
                    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
                    ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons v${response.data.releases[0].releaseVersion} Changelog${GRAY}]`));
                    ChatLib.chat('');
                    ChatLib.chat(response.data.releases[0].changelog);
                    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
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
