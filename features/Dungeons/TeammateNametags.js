import settings from "../../settings";
import { AQUA, GOLD, GREEN, LIGHT_PURPLE, RED, RESET } from "../../utils/formatting";
import { drawStringV2 } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

let tablist;
let NetHandlerPlayClient;
let classMap = {
    "Mage": { color: AQUA, letter: "M" },
    "Berserk": { color: RED, letter: "B" },
    "Tank": { color: GREEN, letter: "T" },
    "Archer": { color: GOLD, letter: "A" },
    "Healer": { color: LIGHT_PURPLE, letter: "H" },
}

register("worldLoad", () => {
    NetHandlerPlayClient = Client.getConnection();
})


register("step", () => {
    tablist = TabList?.getNames();

    if (settings.teammateNametags && settings.teammateNametagsHideVanilla && pogData.skyblockArea.includes("Catacombs")) {
        /*
        From field_150360_v (sirhypernova) in the ct server
        func_96124_cp() - getTeam()
        func_178772_a() - setNameTagVisibility()
        */
        World?.getAllPlayers()?.forEach(player => {
            if (player?.getName() != Player.getName()) player?.player?.func_96124_cp()?.func_178772_a(net.minecraft.scoreboard.Team$EnumVisible.NEVER);
        })
    }
}).setDelay(3)

register("renderWorld", () => {
    if (settings.teammateNametags && pogData.skyblockArea.includes("Catacombs")) {
        if (!tablist) return;
        World.getAllPlayers().forEach(player => {
            let name = player.getName();
            if (Player.getName() == name || NetHandlerPlayClient.func_175104_a(name) == null) return; // getPlayerInfo
            let playerInfo;

            let offset = settings.teammateNametagsHideVanilla ? 2.5 : 3;
            if (player.isSneaking()) offset -= 0.4;

            for (let i = 0; i < 25; i++) {
                let matches = tablist[i].removeFormatting().match(/\[\d+\] (\w+) (?:\W+)?\((.+) \w+\)/);
                if (matches && matches[1] == name) {
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
