import { GRAY, WHITE, AQUA } from "../../utils/formatting";

// Just misc commands
register("command", () => {
    ChatLib.chat(Player?.getHeldItem()?.getRawNBT());
}).setName("getnbt")

register("command", () => {
    let numPearls = 0;

    Player.getInventory().getItems().forEach(item => {
        if (item && item.getName().removeFormatting() == "Ender Pearl") numPearls += item.getStackSize();
    })

    let missing = numPearls == 0 ? 16 : 16 - numPearls % 16;
    
    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Attempting to take ${AQUA + missing + WHITE} pearl${missing > 1 ? 's' : ''} from sacks.`);
    ChatLib.command(`gfs ender pearl ${missing}`)
}).setName("refillpearls")