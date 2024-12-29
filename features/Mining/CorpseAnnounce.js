import settings from "../../settings";

let corpses = [];

register("worldLoad", () => {
    let sent = false;

    if (settings.corpseAnnounce) {
        corpses.length = 0;
        Client.scheduleTask(100, () => {
            for (let i = 0; i < TabList?.getNames()?.length; i++) {
                if (TabList?.getNames()[i]?.removeFormatting()?.includes("Frozen Corpses")) {
                    let counter = 1;
                    while (counter > 0) {
                        if (TabList?.getNames()[i + counter]?.removeFormatting() == "") {
                            if (!sent) {
                                ChatLib.command(`pc Available Corpses: ${corpses.join(", ")}`);
                                sent = true;
                                corpses.length = 0;
                                counter = 0;
                                return;
                            }
                        } else {
                            corpses.push(TabList?.getNames()[i + counter]?.removeFormatting().replace(":", "").split(" ")[1]);
                            counter += 1;
                        }
                    }
                }
            }
        });
    }
});
