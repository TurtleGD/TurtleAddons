import settings from "../../../settings";
import { S32PacketConfirmTranscation } from "../../../utils/packets";
import { EntityArmorStand, EntityEnderman } from "../../../utils/entities";
import { pogData } from "../../../utils/pogData";
import { BOLD, LIGHT_PURPLE, RESET } from "../../../utils/formatting";

let ticks = 0;
let checking = true;
let ticksSinceKilled = 0; // Basically a cooldown after boss dies until it starts looking for boss again

register("worldLoad", () => {
    ticks = 0;
    checking = true;
    ticksSinceKilled = 10;
})

register("tick", () => {
    if (!settings.voidgloomLasersTimer || ticksSinceKilled > 0) return;

    let standName =  World.getAllEntitiesOfType(EntityArmorStand).find(stand => stand.getName().removeFormatting().includes(`Spawned by: ${Player.getName()}`));
    if (!standName) return;

    let boss = World.getAllEntitiesOfType(EntityEnderman).find(eman => eman.distanceTo(standName) < 3.5);
    if (boss && checking && boss.entity.func_70115_ae()) {
        checking = false;
        ticks = 160;
    }
})

register("packetReceived", () => {
    if (!settings.voidgloomLasersTimer) return;

    if (!checking) {
        ticks--;
    }

    if (ticks < -4) {
        checking = true;
        ticks = 0;
    }

    if (ticksSinceKilled > 0) {
        ticksSinceKilled--;
    }
}).setFilteredClass(S32PacketConfirmTranscation)

register("chat", () => {
    if (!settings.voidgloomLasersTimer) return;

    ticks = 0;
    checking = true;
    ticksSinceKilled = 10;
}).setCriteria(/  SLAYER QUEST COMPLETE!|  SLAYER QUEST FAILED!/)

export function drawVoidgloomLasersTimer() {
    Renderer.scale(pogData.voidgloomLasersTimerScale);
    Renderer.drawString(`${LIGHT_PURPLE + BOLD}Lasers: ${RESET + (ticks / 20).toFixed(2)}s`, pogData.voidgloomLasersTimerX / pogData.voidgloomLasersTimerScale, pogData.voidgloomLasersTimerY / pogData.voidgloomLasersTimerScale, true);
}

register("renderOverlay", () => {
    if (settings.voidgloomLasersTimer && ticks > 0) drawVoidgloomLasersTimer();
})