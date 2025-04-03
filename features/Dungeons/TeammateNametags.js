import settings from "../../settings";
import { AQUA, GOLD, GREEN, LIGHT_PURPLE, RED, RESET } from "../../utils/formatting";
import { drawStringV2 } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

let hideNames = false;
let tablist;
let players = [];
let classMap = {
    "Mage": { color: AQUA, letter: "M" },
    "Berserk": { color: RED, letter: "B" },
    "Tank": { color: GREEN, letter: "T" },
    "Archer": { color: GOLD, letter: "A" },
    "Healer": { color: LIGHT_PURPLE, letter: "H" },
}

register("worldLoad", () => {
    hideNames = false;
    players = [];
})

// TabList should be loaded by then
register("step", () => {
    if (!pogData.skyblockArea.includes("Catacombs") || !TabList) return;
    tablist = TabList?.getNames();

    if (settings.teammateNametags && settings.teammateNametagsHideVanilla && hideNames) {
        /*
        func_96124_cp() - getTeam()
        func_178772_a() - setNameTagVisibility()
        */
        World?.getAllPlayers()?.forEach(player => {
            if (player?.getName() != Player.getName()) player?.player?.func_96124_cp()?.func_178772_a(net.minecraft.scoreboard.Team$EnumVisible.NEVER);
        })
    }
}).setFps(2)

register("step", () => {
    players = World.getAllPlayers().filter(player => player.getUUID().version() == 4);
}).setDelay(2)

register("renderWorld", () => {
    if (settings.teammateNametags && pogData.skyblockArea.includes("Catacombs")) {
        if (!tablist || players.length == 0) return;
        players.forEach(player => {
            let name = player.getName();
            if (Player.getName() == name) return; // getPlayerInfo
            let playerInfo;

            let offset = settings.teammateNametagsHideVanilla ? 2.5 : 3;
            if (player.isSneaking()) offset -= 0.4;

            for (let i = 0; i < 25; i++) {
                let matches = tablist[i]?.removeFormatting()?.match(/\[\d+\](?: \[YOUTUBE\])? (\w+) (?:\W+)?\((.+) \w+\)/);
                if (matches && matches[1] == name) {
                    hideNames = true;
                    playerInfo = classMap[matches[2]];
                    drawStringV2(
                        `[${playerInfo.color}${playerInfo.letter}${RESET}] ${playerInfo.color}${name}`, 
                        player.getRenderX(), player.getRenderY() + offset, player.getRenderZ(), 
                        Renderer.WHITE, 
                        settings.teammateNametagsAddTextBoxShadow, 
                        0.05,
                        false, // increase
                        true, // text shadow
                        true); // disable depth
                        break;
                }
            }
        })
    }
})
