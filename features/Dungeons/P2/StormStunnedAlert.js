import settings from "../../../settings";
import { RED, BOLD } from "../../../utils/formatting";
import { pling } from "../../../utils/sounds";

register("chat", () => {
    if (settings.stormStunnedAlert) {
        Client.showTitle(`${RED + BOLD}STORM STUNNED`, "", 0, 20, 0);
        pling.play();
    }
}).setCriteria(/\[BOSS\] Storm: Oof|\[BOSS\] Storm: Ouch, that hurt!/)