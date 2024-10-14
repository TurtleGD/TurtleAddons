import settings from "../settings";
import { AQUA, BOLD, GOLD, RED, RESET } from "./formatting";
import { pogData } from "./pogData";

let gui = new Gui();

let overlays = [];
let draggingIndex = undefined;
let strings = [];
let xPos = "None";
let yPos = "None";
let scale = "None";

export function moveOverlay() {
    gui.open();
}

register("step", () => {
    if (!gui.isOpen()) {
        overlays.length = 0;

        if (settings.maskTimer) overlays.push(["maskTimer", pogData.maskTimerX, pogData.maskTimerY, pogData.maskTimerScale, `${AQUA + BOLD}Invincibility: ${RESET}5.000s`]);
        if (settings.p5RagTimer) overlays.push(["p5RagTimer", pogData.p5RagTimerX, pogData.p5RagTimerY, pogData.p5RagTimerScale, `${AQUA + BOLD}Use Rag in: ${RESET}5.000s`]);
        if (settings.blazePillar) overlays.push(["blazePillar", pogData.blazePillarX, pogData.blazePillarY, pogData.blazePillarScale, `${GOLD + BOLD}7s ${RED + BOLD}8 hits`]);
        if (settings.srbTimer) overlays.push(["srbTimer", pogData.srbTimerX, pogData.srbTimerY, pogData.srbTimerScale, `${AQUA + BOLD}Souls Rebound: ${RESET}5.000s`]);
    }
}).setDelay(1)

register("renderOverlay", () => {
    if (!gui.isOpen()) return;
    strings.length = 0;

    Renderer.drawRect((128 << 24) | (0 << 16) | (0 <<  8) | 0, 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
    Renderer.drawString("Use scroll to change scale.", (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth("Use scroll to change scale.") / 2), 20)
    Renderer.drawString(`x: ${xPos}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`x: ${xPos}`) / 2), 30)
    Renderer.drawString(`y: ${yPos}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`y: ${yPos}`) / 2), 40)
    Renderer.drawString(`Scale: ${scale}`, (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(`Scale: ${scale}`) / 2), 50)
    
    overlays.forEach(overlay => {
        if (typeof settings[overlay[0]] == Boolean) settings[overlay[0]] = false
        else if (typeof settings[overlay[0]] == String) {
            strings.push(settings[overlay[0]]);
            settings[overlay[0]] = "";
        }
        Renderer.scale(overlay[3]);
        Renderer.drawString(overlay[4], overlay[1] / overlay[3], overlay[2] / overlay[3], true);
    })
})

register("guiClosed", () => {
    if (gui.isOpen()) overlays.forEach(overlay => {
        if (typeof settings[overlay[0]] == Boolean) settings[overlay[0]] = true
        else if (typeof settings[overlay[0]] == String) {
            settings[overlay[0]] = strings[0];
            strings.splice(0, 1);
        }
    })
})

register("guiMouseClick", (x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (x > overlay[1] - 5 && x < overlay[1] - 5 + ((Renderer.getStringWidth(overlay[4]) + 10) * overlay[3]) && y > overlay[2] - 5 && y < overlay[2] + (10 * overlay[3])) {
                draggingIndex = index;
                
                xPos = Math.round(overlay[1]) + " (Default: 490)";
                yPos = Math.round(overlay[2]) + " (Default: 249)";
                scale = overlay[3].toFixed(1);
            }
        })
    }
})

register("guiMouseRelease", () => {
    if (gui.isOpen()) {
        draggingIndex = undefined;
        xPos = "None";
        yPos = "None";
        scale = "None";
        overlays.forEach(overlay => {
            overlay[1] = Math.round(overlay[1]);
            overlay[2] = Math.round(overlay[2]);
        })
    }
})

register("scrolled", (x, y, direction) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (direction == 1 && draggingIndex == index && overlay[3] > 0.2) {
                overlay[3] += 0.1;
                pogData[overlay[0] + "Scale"] += 0.1;
                pogData.save();
                scale = overlay[3].toFixed(1);
            }

            if (direction == -1 && draggingIndex == index && overlay[3] > 0.3) {
                overlay[3] -= 0.1;
                pogData[overlay[0] + "Scale"] -= 0.1;
                pogData.save();
                scale = overlay[3].toFixed(1);
            }
        })
    }
})

register("dragged", (dx, dy, x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (draggingIndex == index) {
                overlay[1] += dx;
                overlay[2] += dy;
                pogData[overlay[0] + "X"] += dx;
                pogData[overlay[0] + "Y"] += dy;
                pogData.save();

                xPos = Math.round(overlay[1]) + " (Default: 490)";
                yPos = Math.round(overlay[2]) + " (Default: 249)";
                scale = overlay[3].toFixed(1);
            }
        })
    }
})

register("command", () => {
    overlays.forEach(overlay => {
        overlay[1] = 490;
        overlay[2] = 249;
        overlay[3] = 1;
        pogData[overlay[0] + "X"] = 490;
        pogData[overlay[0] + "Y"] = 249;
        pogData[overlay[0] + "Scale"] = 1;
        pogData.save();
    })
}).setName("taresetgui").setAliases("taguireset")