import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { removeEmojis } from "../../utils/functions";

register("step", () => {
    if (settings.teammateNametags && pogData.skyblockArea.includes("Catacombs")) {
        /*
        From field_150360_v in the ct server
        func_96124_cp() - getTeam()
        func_178772_a() - setNameTagVisibility()
        */
        World?.getAllPlayers()?.forEach(player => {
            if (player?.getName() != Player.getName()) player?.player?.func_96124_cp()?.func_178772_a(net.minecraft.scoreboard.Team$EnumVisible.NEVER);
        });
    }
}).setFps(5);

register("renderWorld", () => {
    if (settings.teammateNametags && pogData.skyblockArea.includes("Catacombs")) {
        Scoreboard.getLines().forEach(line => {
            let lineArr = removeEmojis(line.getName().removeFormatting()).split(" ");
            if (!/\[(M|A|B|H|T)\]/.test(lineArr[0])) return;
            let plr = World.getPlayerByName(lineArr[1].removeFormatting());
            if (!plr || !plr.canSeeEntity(Player.asPlayerMP()) || plr.getName() == Player.getName()) return;

            switch (lineArr[0]) {
                case "[M]":
                    Tessellator.drawString(`[M] ${lineArr[1]}`, plr.getX(), plr.getY() + 2.5, plr.getZ(), Renderer.AQUA, false, 0.05, false);
                    break;
                case "[B]":
                    Tessellator.drawString(`[B] ${lineArr[1]}`, plr.getX(), plr.getY() + 2.5, plr.getZ(), Renderer.DARK_RED, false, 0.05, false);
                    break;
                case "[T]":
                    Tessellator.drawString(`[T] ${lineArr[1]}`, plr.getX(), plr.getY() + 2.5, plr.getZ(), Renderer.DARK_GREEN, false, 0.05, false);
                    break;
                case "[A]":
                    Tessellator.drawString(`[A] ${lineArr[1]}`, plr.getX(), plr.getY() + 2.5, plr.getZ(), Renderer.GOLD, false, 0.05, false);
                    break;
                case "[H]":
                    Tessellator.drawString(`[H] ${lineArr[1]}`, plr.getX(), plr.getY() + 2.5, plr.getZ(), Renderer.LIGHT_PURPLE, false, 0.05, false);
                    break;
            }
        })
    }
})