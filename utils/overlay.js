import settings from "../settings";
import { pogData } from "./pogData";
import { drawInvincibilityTime } from "../features/Dungeons/MaskTimers"; 
import { drawP5RagTimer } from "../features/Dungeons/P5/P5RagTimer";
import { drawSrbTimer } from "../features/Combat/SoulsReboundTimer";
import { drawGoldorTickTimer } from "../features/Dungeons/P3/GoldorTickTimer";
import { drawSmolderingPolarizationTimer } from "../features/Slayers/Blaze/SmolderingPolarization";
import { drawVoidgloomLasersTimer } from "../features/Slayers/Voidgloom/VoidgloomLasersTimer";
import { drawRagnarokHealthOverlay } from "../features/Fishing/RagnarokHealthOverlay";
import { drawArrowPoisonTracker } from "../features/Combat/ArrowPoisonTracker";


let gui = new Gui();

let overlays = [];
let draggingIndex = undefined;
let strings = [];
let xPos = "None";
let yPos = "None";
let scale = "None";
let setting = "None";

export function moveOverlay() {
    gui.open();
}

register("chat", (event) => {
    cancel(event);
    moveOverlay()
}).setCriteria("ta gui")

register("step", () => {
    if (!gui.isOpen()) {
        overlays.length = 0;
        
        if (settings.maskTimer) overlays.push(["Mask Timer", "maskTimer", pogData.maskTimerX, pogData.maskTimerY, pogData.maskTimerScale, drawInvincibilityTime, 120, 18]);
        if (settings.p5RagTimer) overlays.push(["P5 Ragnarock Axe Timer", "p5RagTimer", pogData.p5RagTimerX, pogData.p5RagTimerY, pogData.p5RagTimerScale, drawP5RagTimer, 105, 18]);
        if (settings.srbTimer) overlays.push(["Souls Rebound", "srbTimer", pogData.srbTimerX, pogData.srbTimerY, pogData.srbTimerScale, drawSrbTimer, 110, 18]);
        if (settings.goldorTickTimer) overlays.push(["Goldor Tick Timer", "goldorTickTimer", pogData.goldorTickTimerX, pogData.goldorTickTimerY, pogData.goldorTickTimerScale, drawGoldorTickTimer, 35, 18]);
        if (settings.smolderingPolarizationTimer) overlays.push(["Smoldering Polarization Timer", "smolderingPolarizationTimer", pogData.smolderingPolarizationTimerX, pogData.smolderingPolarizationTimerY, pogData.smolderingPolarizationTimerScale, drawSmolderingPolarizationTimer, 200, 18]);
        if (settings.voidgloomLasersTimer) overlays.push(["Voidgloom Lasers Timer", "voidgloomLasersTimer", pogData.voidgloomLasersTimerX, pogData.voidgloomLasersTimerY, pogData.voidgloomLasersTimerScale, drawVoidgloomLasersTimer, 85, 18]);
        if (settings.ragnarokHealthOverlay) overlays.push(["Ragnarok Health Overlay", "ragnarokHealthOverlay", pogData.ragnarokHealthOverlayX, pogData.ragnarokHealthOverlayY, pogData.ragnarokHealthOverlayScale, drawRagnarokHealthOverlay, 190, 18]);
        if (settings.arrowPoisonTracker) overlays.push(["Arrow Poison Tracker", "arrowPoisonTracker", pogData.arrowPoisonTrackerX, pogData.arrowPoisonTrackerY, pogData.arrowPoisonTrackerScale, drawArrowPoisonTracker, 45, 42]); 
    }
}).setDelay(1)

register("renderOverlay", () => {
    if (!gui.isOpen()) return;
    strings.length = 0;

    Renderer.drawRect((128 << 24) | (0 << 16) | (0 <<  8) | 0, 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
    Renderer.drawString("Use scroll to change scale.", (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth("Use scroll to change scale.") / 2), 20);
    Renderer.drawString(`Setting: ${setting}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`Setting: ${setting}`) / 2), 30);
    Renderer.drawString(`x: ${xPos}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`x: ${xPos}`) / 2), 40);
    Renderer.drawString(`y: ${yPos}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`y: ${yPos}`) / 2), 50);
    Renderer.drawString(`Scale: ${scale}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`Scale: ${scale}`) / 2), 60);

    overlays.forEach(overlay => {
        if (typeof settings[overlay[1]] == "boolean") {
            settings[overlay[1]] = false;
        }
        else if (typeof settings[overlay[1]] == "string") {
            strings.push(settings[overlay[1]]);
            settings[overlay[1]] = "";
        }

        Renderer.scale(overlay[4])
        Renderer.drawRect((128 << 24) | (0 << 16) | (0 <<  8) | 0, (overlay[2] - 5) / overlay[4], (overlay[3] - 5) / overlay[4], overlay[6], overlay[7]);

        overlay[5]()
    })
})

register("guiClosed", () => {
    if (gui.isOpen()) overlays.forEach(overlay => {
        if (typeof settings[overlay[1]] == "boolean") settings[overlay[1]] = true;
        else if (typeof settings[overlay[1]] == "string") {
            settings[overlay[1]] = strings[0];
            strings.splice(0, 1);
        }
    })
})

register("guiMouseClick", (x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (x > overlay[2] - 5 && x < overlay[2] - 5 + overlay[6] * overlay[4] && y > overlay[3] - 5 && y < overlay[3] - 5 + overlay[7] * overlay[4]) {
                draggingIndex = index;
                
                setting = overlay[0];
                xPos = Math.round(overlay[2]);
                yPos = Math.round(overlay[3]);
                scale = overlay[4].toFixed(1);
            }
        })
    }
})


register("guiMouseRelease", () => {
    if (gui.isOpen()) {
        draggingIndex = undefined;
        setting = "None";
        xPos = "None";
        yPos = "None";
        scale = "None";
        overlays.forEach(overlay => {
            overlay[2] = Math.round(overlay[2]);
            overlay[3] = Math.round(overlay[3]);
        })
    }
})


register("scrolled", (x, y, direction) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (direction == 1 && draggingIndex == index && overlay[4] > 0.2) {
                overlay[4] += 0.1;
                pogData[overlay[1] + "Scale"] += 0.1;
                pogData.save();
                scale = overlay[4].toFixed(1);
            }

            if (direction == -1 && draggingIndex == index && overlay[4] > 0.3) {
                overlay[4] -= 0.1;
                pogData[overlay[1] + "Scale"] -= 0.1;
                pogData.save();
                scale = overlay[4].toFixed(1);
            }
        })
    }
})


register("dragged", (dx, dy) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (draggingIndex == index) {
                overlay[2] += dx;
                overlay[3] += dy;
                pogData[overlay[1] + "X"] += dx;
                pogData[overlay[1] + "Y"] += dy;
                pogData.save();

                xPos = Math.round(overlay[2]);
                yPos = Math.round(overlay[3]);
                scale = overlay[4].toFixed(1);
            }
        })
    }
})

register("command", () => {
    overlays.forEach(overlay => {
        overlay[2] = 490;
        overlay[3] = 249;
        overlay[4] = 1;
        pogData[overlay[1] + "X"] = 490;
        pogData[overlay[1] + "Y"] = 249;
        pogData[overlay[1] + "Scale"] = 1;
        pogData.save();
    })
}).setName("taresetgui").setAliases("taguireset")