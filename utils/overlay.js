import settings from "../settings";
import { AQUA, BOLD, GOLD, GRAY, GREEN, RED, RESET, WHITE, YELLOW } from "./formatting";
import { pogData } from "./pogData";

let gui = new Gui();

let overlays = [];
let draggingIndex = undefined;
let strings = [];

export function moveOverlay() {
    gui.open();
}

register('step', () => {
    if (!gui.isOpen()) {
        overlays.length = 0;

        if (settings.maskTimer) overlays.push(['maskTimer', pogData.maskTimerX, pogData.maskTimerY, pogData.maskTimerScale, `${AQUA + BOLD}Invincibility: ${RESET}5.000s`]);
        if (settings.p5RagTimer) overlays.push(['p5RagTimer', pogData.p5RagTimerX, pogData.p5RagTimerY, pogData.p5RagTimerScale, `${AQUA + BOLD}Use Rag in: ${RESET}5.000s`]);
        if (settings.kickedTimer) overlays.push(['kickedTimer', pogData.kickedTimerX, pogData.kickedTimerY, pogData.kickedTimerScale, `${AQUA + BOLD}Cooldown over in: ${RESET}60.0s`]);
        if (settings.gummyWarning) overlays.push(['gummyWarning', pogData.gummyWarningX, pogData.gummyWarningY, pogData.gummyWarningScale, `${GREEN}Smoldering Polarization ${WHITE}60m 0s`]);
        if (settings.blazePillar) overlays.push(['blazePillar', pogData.blazePillarX, pogData.blazePillarY, pogData.blazePillarScale, `${GOLD + BOLD}7s ${RED + BOLD}8 hits`]);
        if (settings.srbTimer) overlays.push(['srbTimer', pogData.srbTimerX, pogData.srbTimerY, pogData.srbTimerScale, `${AQUA + BOLD}Souls Rebound: ${RESET}5.000s`]);
        if (settings.bingoOverlay) overlays.push(['bingoOverlay', pogData.bingoOverlayX, pogData.bingoOverlayY, pogData.bingoOverlayScale, `${GRAY}Break ${YELLOW}150M Crop ${GRAY}Blocks.`]);
        if (settings.blazetekkRadioRange) overlays.push(['blazetekkRadioRange', pogData.blazetekkRadioRangeX, pogData.blazetekkRadioRangeY, pogData.blazetekkRadioRangeScale, `${AQUA + BOLD}Blazetekk: ${GREEN}10.0 blocks away`]);
    }
}).setDelay(1)

register('renderOverlay', () => {
    if (!gui.isOpen()) return;
    strings.length = 0;

    Renderer.drawRect((128 << 24) | (0 << 16) | (0 <<  8) | 0, 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
    Renderer.drawString('Use scroll to change scale.', (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth('Use scroll to change scale.') / 2), 20)
    
    overlays.forEach(overlay => {
        if (typeof settings[overlay[0]] == Boolean) settings[overlay[0]] = false
        else if (typeof settings[overlay[0]] == String) {
            strings.push(settings[overlay[0]]);
            settings[overlay[0]] = '';
        }
        Renderer.scale(overlay[3]);
        Renderer.drawString(overlay[4], overlay[1] / overlay[3], overlay[2] / overlay[3], true);
    })
})

register('guiClosed', () => {
    if (gui.isOpen()) overlays.forEach(overlay => {
        if (typeof settings[overlay[0]] == Boolean) settings[overlay[0]] = true
        else if (typeof settings[overlay[0]] == String) {
            settings[overlay[0]] = strings[0];
            strings.splice(0, 1);
        }
    })
})

register('guiMouseClick', (x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (x > overlay[1] - 5 && x < overlay[1] - 5 + ((Renderer.getStringWidth(overlay[4]) + 10) * overlay[3]) && y > overlay[2] - 5 && y < overlay[2] + (10 * overlay[3])) draggingIndex = index;
        })
    }
})

register('guiMouseRelease', () => {
    if (gui.isOpen()) draggingIndex = undefined;
})

register("scrolled", (x, y, direction) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (direction == 1 && draggingIndex == index && overlay[3] > 0.2) {
                overlay[3] += 0.1;
                pogData[overlay[0] + 'Scale'] += 0.1;
                pogData.save();
            }

            if (direction == -1 && draggingIndex == index && overlay[3] > 0.3) {
                overlay[3] -= 0.1;
                pogData[overlay[0] + 'Scale'] -= 0.1;
                pogData.save();
            }
        })
    }
})

register('dragged', (dx, dy, x, y) => {
    if (gui.isOpen()) {
        overlays.forEach((overlay, index) => {
            if (draggingIndex == index) {
                overlay[1] += dx;
                overlay[2] += dy;
                pogData[overlay[0] + 'X'] += dx;
                pogData[overlay[0] + 'Y'] += dy;
                pogData.save();
            }
        })
    }
})
