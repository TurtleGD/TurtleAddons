import './features/combat/CrimsonTimer.js';
import './features/combat/FinalDestinationTimer.js';
import './features/combat/HideNonCrits.js';
import './features/combat/SoulsReboundTimer.js';
import './features/commands/InstanceCommands.js';
import './features/commands/PartyCommands.js';
import './features/discord/Discord.js';
import './features/dungeons/AnnounceEarlyP2.js';
import './features/dungeons/AnnounceEarlyP3.js';
import './features/dungeons/AnnounceLeaps.js';
import './features/dungeons/AnnouncePreDevice.js';
import './features/dungeons/ArchitechsFirstDraft.js';
import './features/dungeons/BloodAlerts.js';
import './features/dungeons/ClassUltimateAlert.js';
import './features/dungeons/DeathMessage.js';
import './features/dungeons/GoldorTickTimer.js';
import './features/dungeons/GyrokineticWandDisplay.js';
import './features/dungeons/MaskTimers.js';
import './features/dungeons/P5RagTimer.js';
import './features/dungeons/RelicWaypoints.js';
import './features/dungeons/RoomEntryMessage.js';
import './features/dungeons/Terminals.js';
import './features/dungeons/WishAlerts.js';
import './features/dungeons/WitheredDragons.js';
import './features/fishing/ReindrakeHpDisplay.js';
import './features/general/CustomScoreboard.js';
import './features/general/LastCheckedMinions.js';
import './features/general/LevelUpSound.js';
import './features/kuudra/AveragePreTimes.js';
import './features/kuudra/ChunkAlert.js';
import './features/kuudra/HideNametags.js';
import './features/kuudra/P3Dps.js';
import './features/kuudra/P4Dps.js';
import './features/kuudra/P4HpDisplay.js';
import './features/kuudra/RendPull.js';
import './features/kuudra/StunTimer.js';
import './features/kuudra/SupplyTime.js';
import './features/kuudra/Waypoints.js';
import './features/mining/ColdAlert.js';
import './features/mining/CorpseAnnounce.js';
import './features/mining/CorpseWaypoints.js';
import './features/mining/MineshaftExitWaypoint.js';
import './features/slayers/blaze/BlazePillar.js';
import './features/slayers/blaze/HideAttunements.js';
import './features/slayers/blaze/HideDemonMessages.js';
import './features/slayers/blaze/HideFireballs.js';
import './features/slayers/RareDropTitle.js';
import './features/slayers/TrueBossTime.js';
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


// goofy idea surely this works
register('chat', (message, event) => {
    if (message == 'turtleaddons gui test') {
        cancel(event);
        moveOverlay();
    }
}).setCriteria("${message}")
