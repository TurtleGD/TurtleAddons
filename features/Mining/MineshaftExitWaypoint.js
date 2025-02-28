import settings from "../../settings";
import { BOLD } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";
import { createWaypoint } from "../../utils/functions";

let exit = [];

register("worldLoad", () => {
    if (settings.mineshaftExitWaypoint) {
        Client.scheduleTask(20, () => {
            if (pogData.skyblockArea.includes("Glacite Mineshafts")) exit = [Player.getX(), Player.getY(), Player.getZ()];
        })
    }
})

register("worldUnload", () => {
    exit = [];
});

register("renderWorld", () => {
    if (settings.mineshaftExitWaypoint && exit[0]) {
        Tessellator.drawString(`${BOLD}Exit`, exit[0] + 1.5, exit[1] + 4, exit[2] + 1.5, Renderer.WHITE, true, 1.5, true);
        createWaypoint(exit[0] + 1, exit[1] + 4, exit[2] + 1, 1, 1, 1, 0.25, 0.5, true);
    }
});
