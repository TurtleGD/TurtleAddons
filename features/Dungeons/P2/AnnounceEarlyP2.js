import settings from "../../../settings";

let inMaxor = false;
let earlyP2MessageSent = false;
let dungeonClass = undefined;

register('worldLoad', () => {
    inMaxor = false;
    earlyP2MessageSent = false;
    dungeonClass = undefined;
});

register("chat", () => {
    inMaxor = true;
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!");

register("chat", () => {
    inMaxor = false; 
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.");

register("chat", () => {
    setTimeout(() => {
        let tabClass = TabList?.getNames()?.map(a => a.removeFormatting())?.join(", ")?.match(new RegExp(`${Player?.getName()} \\((\\w+)`));
        if (tabClass) dungeonClass = tabClass[1];
    }, 2000);
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.");

register('step', () => {
    if (!earlyP2MessageSent && settings.p2EntryMessage.length > 0 && Player.getY() < 205 && inMaxor && (dungeonClass == 'Mage' || dungeonClass == 'Berserk')) {
        ChatLib.command(`pc ${settings.p2EntryMessage}`);
        earlyP2MessageSent = true;
    }
}).setFps(5);