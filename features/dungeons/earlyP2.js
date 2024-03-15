import settings from "../../settings";

let inMaxor = false;
let earlyP2MessageSent = false;

register('worldLoad', () => {
    inMaxor = false;
    earlyP2MessageSent = false;
});

register("chat", (message) => {
    if (message.includes("I'VE BEEN TOLD I COULD HAVE A BIT OF FUN WITH YOU")) inMaxor = true;
    if (message.includes("I'M TOO YOUNG TO DIE AGAIN")) inMaxor = false; 
}).setCriteria("${message}");


register('tick', () => {
    if (!earlyP2MessageSent && settings.p2EntryMessage.length != 0 && Player.getY() < 205 && inMaxor) {
        let regex = new RegExp(`${Player.getName()}(?:\\s[^\\s]+\\s)?\\((.*?)\\)`);
        let match = TabList.getNames().map(a => a.removeFormatting()).join(", ").match(regex);
        if (match[1].includes('Mage')) {
            ChatLib.command(`pc ${settings.p2EntryMessage}`);
            earlyP2MessageSent = true
        };
    };
});