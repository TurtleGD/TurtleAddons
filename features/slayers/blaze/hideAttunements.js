import settings from "../../../settings";

register("chat", (message, event) => {
    if (settings.hideAttunements) {
        if (message.startsWith("Strike using the") || message == 'Your hit was reduced by Hellion Shield!') cancel(event)
    }
}).setCriteria("${message}")