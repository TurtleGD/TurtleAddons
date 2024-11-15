import settings from "../../../settings";
import { EntityArmorStand } from "../../../utils/entities";
import { RED } from "../../../utils/formatting";
import { pogData } from "../../../utils/pogData";

let sentMessage = false;

function alert() {
    Client.scheduleTask(1, () => {
        Client.showTitle(`${RED}PRE-${pogData.inGoldorPhase} DONE`, "", 0, 20, 20);
        World.playSound("note.pling", 1, 2);
        ChatLib.command(`pc Pre-${pogData.inGoldorPhase} done!`);
        sentMessage = true;
    })
}

register("worldLoad", () => {
    sentMessage = false;
})

register("chat", (message) => {
    if (settings.announcePre2to4) {
        if (message == "[BOSS] Storm: I should have known that I stood no chance.") pogData.goldorPhase = 1;
        else if ((message.includes("(7/7)") || message.includes("(8/8)")) && !message.includes(":")) goldorPhase += 1;
    }
}).setCriteria("${message}")

register("tick", () => {
    if (settings.announcePre2to4) {
        if (sentMessage) return;
        
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            if (stand.getName().removeFormatting() == "Active" && Player.asPlayerMP().distanceTo(stand) < 2 && pogData.inGoldorPhase != pogData.goldorPhase && pogData.goldorPhase == 1) {
                alert()
            }
        })
    }
})

register("chat", (message) => {
    if (settings.announcePre2to4 && pogData.goldorPhase != pogData.inGoldorPhase && pogData.goldorPhase == 1 && !sentMessage && message.removeFormatting().startsWith(`${Player.getName()} completed a device!`)) {
        alert();
    }
}).setCriteria("${message}")