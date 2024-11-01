import settings from "../../../settings";

register("chat", () => {
    if (settings.sendTermInChat != 0 && settings.sendTermInChat != 5) ChatLib.command(`pc Doing ${parseInt(settings.sendTermInChat)}!`);
    if (settings.sendTermInChat == 5) ChatLib.command('pc Doing devices!');
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")