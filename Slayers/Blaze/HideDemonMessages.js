import settings from "../../../settings";

register("chat", (a, b, event) => {
    if (settings.hideDemonMessages) cancel(event)
}).setCriteria(/You took (.+) true damage from Quazii's beam!|You took (.+) true damage from Typhoeus's fire!/)