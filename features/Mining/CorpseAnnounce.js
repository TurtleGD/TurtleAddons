import settings from "../../settings";
import { pogData } from "../../utils/pogData";

let corpses = [];
let sent = false;

register("worldLoad", () => {
    sent = false;
})

register("step", () => {
    if (settings.corpseAnnounce && pogData.skyblockArea.includes("Glacite Mineshafts") && !sent && TabList != null) {
        let lines = TabList?.getNames();
        if (!lines) return;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i]?.removeFormatting()?.includes("Frozen Corpses")) {
                let counter = 1;
                while (counter > 0) {
                    if (lines[i + counter]?.removeFormatting() == "") {
                        ChatLib.command(`pc Available Corpses: ${corpses.join(", ")}`);
                        sent = true;
                        corpses.length = 0;
                        counter = 0;
                        return;
                    } else {
                        corpses.push(lines[i + counter]?.removeFormatting().replace(":", "").split(" ")[1]);
                        counter += 1;
                    }
                }
            }
        }
    }
}).setFps(3)