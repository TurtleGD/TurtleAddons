import settings from "../../settings";
import { EntityArmorStand } from "../../utils/entities";
import { pogData } from "../../utils/pogData";

let text = '§e﴾ §8[§7Lv666§8] §c§lRagnarok§r§r §a125M§f/§a125M§c❤ §e﴿';
let isle = false;
let detected = false;

register("worldLoad", () => {
    Client.scheduleTask(100, () => {isle = inIsle()});
    detected = false;
})

function inIsle() {
    if (TabList && TabList.getNames()) {
        return TabList.getNames().some(line => line.removeFormatting().includes("Area: Crimson Isle"));
    } else return false;
}

register("renderWorld", () => {
    if (settings.ragnarokHealthOverlay && isle) {
        let stands = World.getAllEntitiesOfType(EntityArmorStand);
        for (let i = 0; i < stands.length; i++) {
            let stand = stands[i];
            if (stand.getName().removeFormatting().includes("Ragnarok")) {
                text = stand.getName();
                if (!text.includes('e﴾')) {
                    text = '§e﴾ ' + text + ' §e﴿';
                    detected = true;
                }
                return;
            }
        }
        text = '§e﴾ §8[§7Lv666§8] §c§lRagnarok§r§r §a125M§f/§a125M§c❤ §e﴿';
        detected = false;
    }
})

export function drawRagnarokHealthOverlay() {
    Renderer.scale(pogData.ragnarokHealthOverlayScale);
    Renderer.drawString(text, pogData.ragnarokHealthOverlayX / pogData.ragnarokHealthOverlayScale, pogData.ragnarokHealthOverlayY / pogData.ragnarokHealthOverlayScale, true);
}

register("renderOverlay", () => {
    if (settings.ragnarokHealthOverlay && detected) drawRagnarokHealthOverlay();
})