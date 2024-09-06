import settings from "../../settings";
import { AQUA, GRAY, RESET } from "../../utils/formatting";

register("chat", (a) => {
    if (!settings.architectsFirstDraft) return;

    setTimeout(() => ChatLib.chat(new TextComponent(`${GRAY}[${AQUA}TurtleAddons${GRAY}]${RESET} Click here to get an Architect's First Draft!`).setClick('run_command', "/gfs architect's first draft 1")), 10)
}).setCriteria("PUZZLE FAIL!${a}");

register("chat", () => {
    ChatLib.deleteChat("[TurtleAddons] Click here to get an Architect's First Draft!")
}).setCriteria("Moved 1 Architect's First Draft from your Sacks to your inventory.");