import settings from "../../settings";
import { BOLD } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";
import { createWaypoint } from "../../utils/functions";

let exit = [];

register("worldLoad", () => {
    if (settings.mineshaftExitWaypoint) {
        Client.scheduleTask(30, () => {
            if (pogData.skyblockArea.includes("Glacite Mineshafts")) exit = [Player.getX(), Player.getY(), Player.getZ()];
        })
    }
})

register("worldUnload", () => {
    exit = [];
});

register("renderWorld", () => {
    if (settings.mineshaftExitWaypoint && exit[0]) {
        Tessellator.drawString(`${BOLD}Exit`, exit[0], exit[1] + 0.5, exit[2], Renderer.WHITE, true, 1.5, true);
        createWaypoint(exit[0] - 0.5, exit[1], exit[2] - 0.5, 1, 1, 1, 0.25, 0.5, true);
    }
});