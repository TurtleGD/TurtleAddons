import settings from "../../../settings";

register("chat", (message, event) => {
    if (settings.hideDemonMessages) {
        if ((message.includes("true damage from Quazii's beam") || message.includes("true damage from Typhoeus's fire")) && !message.includes(':')) cancel(event)
    }
}).setCriteria("${message}")