import settings from "../../settings";

let inMaxor = false;
let earlyP2MessageSent = false;

register('worldLoad', () => {
    inMaxor = false;
    earlyP2MessageSent = false;
});

register("chat", (message) => {
    if (message == "[BOSS] Storm: I'M TOO YOUNG TO DIE AGAIN") inMaxor = true;
    if (message == "[BOSS] Storm: I'M TOO YOUNG TO DIE AGAIN" || message == '[BOSS] Storm: Pathetic Maxor, just like expected.') inMaxor = false; 
}).setCriteria("${message}");


register('tick', () => {
    if (!earlyP2MessageSent && settings.p2EntryMessage.length != 0 && Player.getY() < 205 && inMaxor) {
        let regex = new RegExp(`${Player.getName()} \\((\\w+)`);
        let match = TabList.getNames().map(a => a.removeFormatting()).join(", ").match(regex);
        if (match[1] == ('Mage') || match[1] == ('Berserker')) {
            ChatLib.chat(`pc ${settings.p2EntryMessage}`);
            earlyP2MessageSent = true
        }
    }
})
