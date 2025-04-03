import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { GRAY, AQUA, WHITE } from "../../utils/formatting";

let hidePlayersKeybind = new KeyBind("Hide Players", pogData.hidePlayersKeybind, "./TurtleAddons");
let hidePlayers = false;
let players = [];

register("gameUnload", () => {
    pogData.hidePlayersKeybind = hidePlayersKeybind.getKeyCode();
    pogData.save()
}).setPriority(Priority.HIGHEST);

hidePlayersKeybind.registerKeyPress(() => {
    if (hidePlayers) {
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Showing players.`);
        hidePlayers = false;
    } else {
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Hiding players.`);
        hidePlayers = true;
    }
})

register("step", () => {
    players = World.getAllPlayers().filter(player => player.getUUID().version() == 4);
}).setDelay(2)

register("renderEntity", (entity, pos, partialTicks, event) => {
    if (!hidePlayers) return;
    if (entity.getName() == Player.getName() && !settings.hideSelf) return;
    if (players.some(e => e.getName() == entity.getName())) cancel(event);
})