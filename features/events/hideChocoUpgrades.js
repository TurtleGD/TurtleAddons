import settings from "../../settings";

register('chat', (message, event) => {
    if (settings.hideChocoUpgrades && (message.includes('has been promoted to') || message.includes('Your Rabbit Barn capacity has been increased to')) && !message.includes(':')) cancel(event);
}).setCriteria("${message}")