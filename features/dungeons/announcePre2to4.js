import settings from "../../settings";
import { EntityArmorStand } from "../../utils/entities";
import { RED } from "../../utils/formatting";

function inGoldorPhase() {
    if ((Player.getX() > 90 && Player.getX() < 110) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 52 && Player.getZ() < 123)) return 1;
    else if ((Player.getX() > 17 && Player.getX() < 88) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 122 && Player.getZ() < 142)) return 2;
    else if ((Player.getX() > -2 && Player.getX() < 18) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 49   && Player.getZ() < 120)) return 3;
    else if ((Player.getX() > 20 && Player.getX() < 88) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 30 && Player.getZ() < 50)) return 4;
    else if ((Player.getX() > 41 && Player.getX() < 68) && (Player.getY() > 110 && Player.getY() < 150) && (Player.getZ() > 59 && Player.getZ() < 117)) return 5;
    else return 0;
}

let goldorPhase = 0;
let sentMessage = false;

register('worldLoad', () => {
    goldorPhase = 0;
    sentMessage = false;
})

register('chat', (message) => {
    if (settings.announcePre2to4) {
        if (message == '[BOSS] Storm: I should have known that I stood no chance.') goldorPhase = 1;
        else if ((message.includes('(7/7)') || message.includes('(8/8)')) && !message.includes(':')) goldorPhase += 1;
    }
}).setCriteria("${message}")

register('tick', () => {
    if (settings.announcePre2to4) {
        if (sentMessage) return;
        
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            if (stand.getName().removeFormatting() == 'Active' && Player.asPlayerMP().distanceTo(stand) < 2 && inGoldorPhase() != 1 && goldorPhase == 1) {
                setTimeout(() => {
                    Client.showTitle(`${RED}PRE-${inGoldorPhase()} DONE`, '', 0, 20, 20);
                    World.playSound('note.pling', 1, 2);
                    ChatLib.command(`pc Pre-${inGoldorPhase()} done!`);
                    sentMessage = true;
                }, 10)
            }
        })
    }
})