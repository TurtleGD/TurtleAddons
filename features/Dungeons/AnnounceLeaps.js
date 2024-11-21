import settings from "../../settings";

register("chat", (player, event) => {
    if (settings.announceLeaps) {
        ChatLib.command(`pc Leaping to ${player}`);
        cancel(event);
    }
}).setCriteria("You have teleported to ${player}");