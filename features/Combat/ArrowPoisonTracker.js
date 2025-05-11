import settings from "../../settings";
import { RED, GREEN } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let twilightIcon = new Item("dye").setDamage(5).setStackSize(1);
let toxicIcon = new Item("dye").setDamage(10).setStackSize(5);
let numTwilight = 0;
let numToxic = 0;

register("step", () => {
    if (!settings.arrowPoisonTracker) return;

    let inv = Player.getInventory();
    if (!inv) return;
    
    numTwilight = 0;
    numToxic = 0;

    inv.getItems().forEach(item => {
        if (item) {
            if (item.getName().removeFormatting().includes("Twilight Arrow Poison")) numTwilight += item.getStackSize();
            else if (item.getName().removeFormatting().includes("Toxic Arrow Poison")) numToxic += item.getStackSize();
        }
    })
}).setFps(3)

export function drawArrowPoisonTracker() {
    twilightIcon.draw(pogData.arrowPoisonTrackerX, pogData.arrowPoisonTrackerY, pogData.arrowPoisonTrackerScale)
    toxicIcon.draw(pogData.arrowPoisonTrackerX, pogData.arrowPoisonTrackerY + 15 * pogData.arrowPoisonTrackerScale, pogData.arrowPoisonTrackerScale)

    Renderer.scale(pogData.arrowPoisonTrackerScale)
    Renderer.drawString(`${numTwilight == 0 ? RED : GREEN}${numTwilight}x`, (pogData.arrowPoisonTrackerX + 20 * pogData.arrowPoisonTrackerScale) / pogData.arrowPoisonTrackerScale, (pogData.arrowPoisonTrackerY + 5 * pogData.arrowPoisonTrackerScale) / pogData.arrowPoisonTrackerScale, true)
    Renderer.scale(pogData.arrowPoisonTrackerScale)
    Renderer.drawString(`${numToxic == 0 ? RED : GREEN}${numToxic}x`, (pogData.arrowPoisonTrackerX + 20 * pogData.arrowPoisonTrackerScale) / pogData.arrowPoisonTrackerScale, (pogData.arrowPoisonTrackerY + 20 * pogData.arrowPoisonTrackerScale) / pogData.arrowPoisonTrackerScale, true)
}

register("renderOverlay", () => {
    if (settings.arrowPoisonTracker) drawArrowPoisonTracker();
})
