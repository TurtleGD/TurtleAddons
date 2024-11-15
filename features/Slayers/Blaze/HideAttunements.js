import settings from "../../../settings";

register("chat", (message, event) => {
    if (settings.hideAttunements && (message == "Your hit was reduced by Hellion Shield!" || message.startsWith("Strike using the"))) cancel(event)
}).setCriteria("${message}")