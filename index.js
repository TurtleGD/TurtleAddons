import "./features/Combat/ArrowPoisonTracker.js";
import "./features/Combat/CrimsonTimer.js";
import "./features/Combat/HideNonCrits.js";
import "./features/Combat/SoulsReboundTimer.js";
import "./features/Commands/Commands.js";
import "./features/Commands/PartyCommands.js";
import "./features/Discord/Discord.js";
import "./features/Dungeons/P2/AnnounceEarlyP2.js";
import "./features/Dungeons/P2/StormStunnedAlert.js";
import "./features/Dungeons/P3/AnnounceEarlyP3.js";
import "./features/Dungeons/P3/AnnouncePreDevice.js";
import "./features/Dungeons/P3/GoldorPhaseCheck.js";
import "./features/Dungeons/P3/GoldorTickTimer.js";
import "./features/Dungeons/P3/TerminalCallouts.js";
import "./features/Dungeons/P3/TerminalGuiScale.js";
import "./features/Dungeons/P3/TerminalHighlights.js";
import "./features/Dungeons/P3/TerminalLabels.js";
import "./features/Dungeons/P5/DragonSpawnTimer.js";
import "./features/Dungeons/P5/P5RagTimer.js";
import "./features/Dungeons/P5/P5RelicTimer.js";
import "./features/Dungeons/P5/P5RelicWaypoints.js";
import "./features/Dungeons/P5/WitheredDragons.js";
import "./features/Dungeons/AnnounceLeaps.js";
import "./features/Dungeons/AnnounceMimicDead.js";
import "./features/Dungeons/ArchitechsFirstDraft.js";
import "./features/Dungeons/BloodAlerts.js";
import "./features/Dungeons/ClassUltimateAlert.js";
import "./features/Dungeons/ColorMimicChests.js";
import "./features/Dungeons/DeathMessage.js";
import "./features/Dungeons/GyrokineticWandDisplay.js";
import "./features/Dungeons/MaskTimers.js";
import "./features/Dungeons/RoomEntryMessage.js";
import "./features/Dungeons/ServerLagTimes.js";
import "./features/Dungeons/TeammateNametags.js";
import "./features/Dungeons/WishAlerts.js";
import "./features/Fishing/MuteFlashSound.js";
import "./features/Fishing/RagnarokHealthOverlay.js";
import "./features/Fishing/ReindrakeHpDisplay.js";
import "./features/General/CustomScoreboard.js";
import "./features/General/HidePlayers.js";
import "./features/General/LastCheckedMinions.js";
import "./features/General/LevelUpSound.js";
import "./features/Kuudra/ChunkAlert.js";
import "./features/Kuudra/HideNametags.js";
import "./features/Kuudra/P3Dps.js";
import "./features/Kuudra/P4Dps.js";
import "./features/Kuudra/P4HpDisplay.js";
import "./features/Kuudra/RendPull.js";
import "./features/Kuudra/StunTimer.js";
import "./features/Kuudra/SupplyTime.js";
import "./features/Kuudra/Waypoints.js";
import "./features/Mining/ColdAlert.js";
import "./features/Mining/CorpseAnnounce.js";
import "./features/Mining/CorpseWaypoints.js";
import "./features/Mining/MineshaftExitWaypoint.js";
import "./features/Slayers/Blaze/BlazePillar.js";
import "./features/Slayers/Blaze/HideAttunements.js";
import "./features/Slayers/Blaze/HideDemonMessages.js";
import "./features/Slayers/Blaze/HideFireballs.js";
import "./features/Slayers/Blaze/SmolderingPolarization.js";
import "./features/Slayers/Voidgloom/VoidgloomLasersTimer.js";
import "./features/Slayers/RareDropTitle.js";
import "./features/Slayers/TrueBossTime.js";
import settings from "./settings";
import axios from "../axios";
import { AQUA, WHITE, STRIKETHROUGH, BOLD, GRAY, RED, GREEN } from "./utils/formatting.js";
import { moveOverlay } from "./utils/overlay.js";
import { drawArrowPoisonTracker } from "./features/Combat/ArrowPoisonTracker.js";

register("command", (arg) => {
    switch (arg) {
        case undefined:
            settings.openGUI();
            break;
        case "help":
        case "commands":
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons Commands${GRAY}]`));
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}General:`));
            ChatLib.chat("");
            ChatLib.chat(`${AQUA}/ta (/turtleaddons, /turtle, /8joh, /joh) ${WHITE}- Open settings.`);
            ChatLib.chat(`${AQUA}/ta gui ${WHITE}- Move overlays. Use scroll to change scale.`);
            ChatLib.chat(`${AQUA}/taresetgui ${WHITE}- Reset overlays.`);
            ChatLib.chat(`${AQUA}/ta changelog ${WHITE}- View changelog.`);
            ChatLib.chat(`${AQUA}/getnbt ${WHITE}- Send NBT data of held item into chat. Run "/ct dump" to get color codes.`);
            ChatLib.chat(`${AQUA}/refillpearls ${WHITE}- Runs /gfs ender pearls to the nearest stack.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Kuudra:`));
            ChatLib.chat("");
            ChatLib.chat(`${AQUA}/t[1-5] ${WHITE}- Enter Kuudra tiers 1-5.`);
            ChatLib.chat(`${AQUA}/clearpres ${WHITE}- Clears data for /avgpre.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${AQUA + BOLD}Dungeons:`));
            ChatLib.chat("");
            ChatLib.chat(`${AQUA}/f[1-7] ${WHITE}- Enter Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA}/m[1-7] ${WHITE}- Enter Master Catacomb floors 1-7.`);
            ChatLib.chat(`${AQUA}/getroom ${WHITE}- Gets the current dungeon room you are in.`);
            ChatLib.chat(`${AQUA}/dragpbs ${WHITE}- Gets your PB M7 dragon kill times.`);
            ChatLib.chat(`${AQUA}/cleardragpbs ${WHITE}- Clears your PB M7 dragon kill times.`);
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            break;
        case "changelog":
        case "changelogs":
            axios.get("https://api.github.com/repos/TurtleGD/TurtleAddons/releases/latest")
                .then(response => {
                    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
                    ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons ${response.data.name} Changelog${GRAY}]`));
                    ChatLib.chat("");
                    ChatLib.chat(response.data.body.replace(/\r/g, ""));
                    ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
                })
                .catch(error => {
                    ChatLib.chat(error);
                    console.log(error);
                });
            break;
        case "gui":
            moveOverlay();
            break;
        }
}).setName("turtleaddons").setAliases("ta", "turtle", "8joh", "joh");

register("worldLoad", () => {
    Client.showTitle(" ", " ", 0, 0, 1); // Might fix first titles not appearing
})
