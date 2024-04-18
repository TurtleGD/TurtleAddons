import settings from "../../settings";

register("chat", (message) => {
    if (settings.announceLeaps) {
        const regex = /You have teleported to (.+)/;
        const match = message.match(regex);

        if (match) {
            ChatLib.command(`pc Leaping to ${match[1]}`)
        };
    }
}).setCriteria("${message}");