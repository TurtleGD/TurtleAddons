import settings from "../../settings";
import { AQUA, GRAY, RESET } from "../../utils/formatting";

register("chat", (message) => {
    if (!settings.architectsFirstDraft) return;

    if (message.startsWith('PUZZLE FAIL!')) {
        setTimeout(() => ChatLib.chat(new TextComponent(`${GRAY}[${AQUA}TurtleAddons${GRAY}]${RESET} Click here to get an Architect's First Draft!`).setClick('run_command', "/gfs architect's first draft 1")), 10)
    }

    if (message == "Moved 1 Architect's First Draft from your Sacks to your inventory.") {
        ChatLib.deleteChat("[TurtleAddons] Click here to get an Architect's First Draft!")
    }
}).setCriteria("${message}");