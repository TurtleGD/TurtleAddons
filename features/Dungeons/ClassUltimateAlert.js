import settings from "../../settings";
import { AQUA, BOLD, OBFUSCATED, RESET } from "../../utils/formatting";

register("chat", (message) => {
    if (settings.ultAlert && (message == 'Used Ragnarok!' || message.startsWith('Your Wish healed you for') || message == 'Used Thunderstorm!' || message == 'Used Rapid Fire!' || message == 'Used Castle of Stone!')) {
        setTimeout(() => {
            Client.showTitle(`${OBFUSCATED}a${RESET} ${AQUA + BOLD}USED ULT! ${RESET + OBFUSCATED}a${RESET}  `, '', 0, 40, 20);
            World.playSound('note.pling', 1, 2);
        }, 10)
    }
}).setCriteria("${message}")