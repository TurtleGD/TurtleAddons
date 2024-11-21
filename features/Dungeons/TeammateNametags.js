import settings from "../../settings";
import { AQUA, DARK_BLUE, GOLD, GREEN, LIGHT_PURPLE, RED, RESET, YELLOW } from "../../utils/formatting";
import { drawStringV2 } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

let players = [];

register("worldLoad", () => {
    players = [];
})

register("step", () => {
    if (settings.teammateNametags && settings.teammateNametagsHideVanilla && pogData.skyblockArea.includes("Catacombs") && players.length > 0) {
        /*
        From field_150360_v (sirhypernova) in the ct server
        func_96124_cp() - getTeam()
        func_178772_a() - setNameTagVisibility()
        */
        World?.getAllPlayers()?.forEach(player => {
            if (player?.getName() != Player.getName()) player?.player?.func_96124_cp()?.func_178772_a(net.minecraft.scoreboard.Team$EnumVisible.NEVER);
        })
    }
}).setFps(5)

register("chat", () => {
    Client.scheduleTask(20, () => {
        TabList.getNames().forEach(line => {
            let matches = line.removeFormatting().match(/\[\d+\] (\w+) (?:\W+)?\((.+) \w+\)/); // kinda cursed
            if (matches) players.push([matches[1], matches[2]]);
        })
    })
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("renderWorld", () => {
    if (settings.teammateNametags && pogData.skyblockArea.includes("Catacombs")) {
        players.forEach(playerArr => {
            if (playerArr[0] == Player.getName()) return;
            let playerEntity = World.getPlayerByName(playerArr[0]);
            if (!playerEntity) return;

            let offset = settings.teammateNametagsHideVanilla ? 2.5 : 3;
            if (playerEntity.isSneaking()) offset -= 0.4;

            let classMap = {
                "Mage": { color: AQUA, letter: "M" },
                "Berserk": { color: RED, letter: "B" },
                "Tank": { color: GREEN, letter: "T" },
                "Archer": { color: GOLD, letter: "A" },
                "Healer": { color: LIGHT_PURPLE, letter: "H" },
            }
            
            let playerInfo = classMap[playerArr[1]];

            drawStringV2(
                `[${playerInfo.color}${playerInfo.letter}${RESET}] ${playerInfo.color}${playerArr[0]}`, 
                playerEntity.getRenderX(), playerEntity.getRenderY() + offset, playerEntity.getRenderZ(), 
                Renderer.WHITE, 
                settings.teammateNametagsAddTextBoxShadow, 
                0.05,
                false, // increase
                true, // text shadow
                true); // disable depth
        })
    }
})