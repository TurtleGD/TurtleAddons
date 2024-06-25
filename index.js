import "./features/combat/blazetekkRadioRange.js";
import "./features/combat/crimsonTimer.js";
import "./features/combat/finalDestinationTimer.js";
import "./features/combat/hideCrits.js";
import "./features/combat/srbTimer.js";
import "./features/discord/discord.js";
import "./features/dungeons/announceEarlyP3.js";
import "./features/dungeons/announceLeaps.js";
import "./features/dungeons/announcePre2to4.js";
import "./features/dungeons/architechsFirstDraft.js";
import "./features/dungeons/bloodAlerts.js";
import "./features/dungeons/deathMessage.js";
import "./features/dungeons/dragonDeath.js";
import "./features/dungeons/earlyP2.js";
import "./features/dungeons/gyroDisplay.js"
import "./features/dungeons/maskTimers.js";
import "./features/dungeons/ragTimer.js";
import "./features/dungeons/relicWaypoints.js";
import "./features/dungeons/roomMessage.js";
import "./features/dungeons/terminals.js";
import "./features/dungeons/ultAlert.js";
import "./features/dungeons/watcherDialogueSkip.js";
import "./features/dungeons/wishAlerts.js";
import "./features/events/bingoOverlay.js";
import "./features/events/hideChocoUpgrades.js";
import "./features/fishing/underground.js";
import "./features/general/blacklist.js";
import "./features/general/customScoreboard.js";
import "./features/general/kickedTimer.js";
import "./features/general/lastCheckedMinion.js";
import "./features/general/levelUp.js";
import "./features/kuudra/avgPre.js";
import "./features/kuudra/chunkAlert.js";
import "./features/kuudra/partyDps.js";
import "./features/kuudra/stunDps.js";
import "./features/kuudra/stunTimer.js";
import "./features/kuudra/trueHpDisplay.js";
import "./features/kuudra/waypoints.js";
import "./features/mining/coldAlert.js";
import "./features/mining/corpseAnnounce.js";
import "./features/mining/corpseWaypoint.js";
import "./features/mining/mineshaftExitWaypoint.js";
import "./features/mining/routeWaypoints.js"
import "./features/partyCommands/instanceCommands.js";
import "./features/partyCommands/leaderCommands.js"
import "./features/rift/punchcardArtifact.js";
import "./features/rift/vampireHits.js";
import "./features/slayers/rareDrops.js";
import "./features/slayers/bossTime.js";
import "./features/slayers/blaze/blazePillar.js";
import "./features/slayers/blaze/hideAttunements.js";
import "./features/slayers/blaze/hideDemonMessages.js";
import "./features/slayers/blaze/hideFireballs.js";
import "./features/slayers/blaze/quietBlaze.js";
import "./features/slayers/blaze/smolderingPolarization.js";
import settings from './settings';
import axios from '../axios';
import { AQUA, WHITE, STRIKETHROUGH, BOLD, GRAY } from './utils/formatting.js';
import { moveOverlay } from './utils/overlay.js';

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
            ChatLib.chat(`${AQUA}/ta gui ${WHITE}- Move overlays. Use scroll to change scale.`);
            ChatLib.chat(`${AQUA}/ta changelog ${WHITE}- View changelog.`);
            ChatLib.chat(`${AQUA}/getnbt ${WHITE}- Send NBT data of held item into chat. Open '/ct console' to get color codes.`);
            ChatLib.chat(`${AQUA}/blacklist [view/add/remove/clear] ${WHITE}- Access the party finder blacklist.`);
            ChatLib.chat(`${AQUA}/ta legacyoverlay ${WHITE}- View legacy commands to move overlay guis. Might be helpful if you want to be precise.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Kuudra:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/t[1-5] ${WHITE}- Enter Kuudra tiers 1-5.`);
            ChatLib.chat(`${AQUA}/avgpre ${WHITE}- View average placement times of first and second pres.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Dungeons:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/f[1-7] ${WHITE}- Enter Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA}/m[1-7] ${WHITE}- Enter Master Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA}/getroom ${WHITE}- Gets the current dungeon room you are in.`);
            ChatLib.chat(`${AQUA}/dragpb ${WHITE}- Gets your PB M7 dragon kill times.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Fishing:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/checkunderground [distance] ${WHITE}- Checks if you get fishing speed nerf in blocks around you and makes an overlay.`);
            ChatLib.chat(`${AQUA}/clearunderground ${WHITE}- Clears the block overlays.`);
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Mining:`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/routewaypoints help ${WHITE}- More info on Crystal Hollows route waypoints.`);
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
        case 'gui':
            moveOverlay();
            break;
        case 'legacyoverlay':
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Moving Guis (Legacy):`));
            ChatLib.chat('');
            ChatLib.chat(`${AQUA}/movebingooverlay [x/y/scale] [num] ${WHITE}- Edit Bingo Overlay.`);
            ChatLib.chat(`${AQUA}/movelobby [x/y/scale] [num] ${WHITE}- Edit Kicked To Lobby Timer.`);
            ChatLib.chat(`${AQUA}/movegummy [x/y/scale] [num] ${WHITE}- Edit Smoldering Polarization Display.`);
            ChatLib.chat(`${AQUA}/movesrb [x/y/scale] [num] ${WHITE}- Edit Souls Rebound Timer.`);
            ChatLib.chat(`${AQUA}/moverag [x/y/scale] [num] ${WHITE}- Edit P5 Ragnarok Axe Timer.`);
            ChatLib.chat(`${AQUA}/movemask [x/y/scale] [num] ${WHITE}- Edit Invincibility Timers.`);
            ChatLib.chat(`${AQUA}/moveblazetekk [x/y/scale] [num] ${WHITE}- Edit Blazetekk Display.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            break;
        }
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');

// NBT command
register('command', () => {
    ChatLib.simulateChat(Player.getHeldItem()?.getNBT());
}).setName('getnbt');

// For testing sound
register('chat', (message, event) => {
    if (message == 'LEVEL UP') cancel(event);
}).setCriteria("${message}")
