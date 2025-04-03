import settings from "../../settings";
import { AQUA, BOLD, OBFUSCATED, RESET } from "../../utils/formatting";

register("chat", () => {
    if (settings.ultAlert) {
        Client.scheduleTask(1, () => { // why is this here again? works fine with it so whatever
            Client.showTitle(`${OBFUSCATED}a${RESET} ${AQUA + BOLD}USED ULT! ${RESET + OBFUSCATED}a${RESET}  `, "", 0, 40, 20);
            World.playSound("note.pling", 1, 2);
        })
    }
}).setCriteria(/^(Used Ragnarok!|Used Thunderstorm!|Used Rapid Fire!|Used Castle of Stone!|Your Wish healed you for)/)