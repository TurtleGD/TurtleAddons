import settings from "../../../settings";
import { GREEN, BOLD, RESET } from "../../../utils/formatting";
import { S2DPacketOpenWindow, S32PacketConfirmTranscation } from "../../../utils/packets";
import { pogData } from "../../../utils/pogData";
import { getTime } from "../../../utils/functions";

let checkForPolarization = false;
let ticks = 0;
let waitForConfirmation = true;

register("worldLoad", () => {
    checkForPolarization = false;
    ticks = 0;
    waitForConfirmation = true;
})

register("chat", () => {
    pogData.smolderingPolarizationTimer += 3600;
    pogData.save()
}).setCriteria("You ate a Re-heated Gummy Polar Bear!")

function inRift() {
    if (TabList && TabList.getNames()) {
        return TabList.getNames().some(line => {
            if (line.includes("The Rift")) {
                return true;
            }
            return false;
        })
    }
    return false;
}

register("tick", () => {
    if (pogData.skyblockArea.includes("Catacombs") || inRift()) return;

    if (waitForConfirmation && !checkForPolarization) {
        ticks++;
        if (ticks == 20 && pogData.smolderingPolarizationTimer > 0) {
            ticks = 0;
            pogData.smolderingPolarizationTimer -= 1;
            pogData.save();
        }
    }
})

register("packetReceived", () => {
    if (pogData.skyblockArea.includes("Catacombs") || inRift()) return;

    if (waitForConfirmation) waitForConfirmation = false;

    if (!checkForPolarization) {
        ticks++;
        if (ticks == 20 && pogData.smolderingPolarizationTimer > 0) {
            ticks = 0;
            pogData.smolderingPolarizationTimer -= 1;
        }
    }
}).setFilteredClass(S32PacketConfirmTranscation)

register("guiClosed", () => {
    if (checkForPolarization) checkForPolarization = false;
})

register("packetReceived", (packet) => {
    let containerTitle = packet.func_179840_c().func_150260_c(); // packet.getWindowTitle().getUnformattedText()
    if (containerTitle.endsWith("Active Effects")) checkForPolarization = true;
}).setFilteredClass(S2DPacketOpenWindow)

register("step", () => {
    if (checkForPolarization && Player.getContainer()) {
        let effects = Player.getContainer().getItems();

        effects.forEach(effect => {
            if (effect && effect.getName().removeFormatting() == "Smoldering Polarization I") {
                let lore = effect.getLore();
                lore.forEach(line => {
                    let match = line.removeFormatting().match(/Remaining: (.+)/);
                    if (match) {
                        let parts = match[1].split(":");
                        let seconds = 0;

                        parts.forEach((part, index) => {
                            seconds += parseInt(part) * (60 ** (parts.length - index - 1));
                        })
                        pogData.smolderingPolarizationTimer = seconds;
                        pogData.save();
                    }
                })
            }
        })
    }
}).setFps(2)

export function drawSmolderingPolarizationTimer() {
    Renderer.scale(pogData.smolderingPolarizationTimerScale);
    Renderer.drawString(`${GREEN + BOLD}Smoldering Polarization: ${RESET + getTime(pogData.smolderingPolarizationTimer)}`, pogData.smolderingPolarizationTimerX / pogData.smolderingPolarizationTimerScale, pogData.smolderingPolarizationTimerY / pogData.smolderingPolarizationTimerScale, true);
}

register("renderOverlay", () => {
    if (settings.smolderingPolarizationTimer && pogData.smolderingPolarizationTimer) drawSmolderingPolarizationTimer();
})