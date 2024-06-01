import settings from "../../settings";
import { LIGHT_PURPLE } from "../../utils/formatting";

/*
Helmet - Slot 4
Chestplate - Slot 3
Leggings - Slot 2
Boots - Slot 1
*/

let playerEntity = undefined;
let wearingFD = false;
let isSneaking = false;
let lastHit = undefined;
let finalDestinationActive = false;
let timeLeft = -1;
let lastHP = undefined;

register('worldLoad', () => {
    setTimeout(() => playerEntity = new EntityLivingBase(Player?.asPlayerMP()?.getEntity()), 500)
    wearingFD = false;
    isSneaking = false;
    lastHit = undefined;
    finalDestinationActive = false;
    timeLeft = -1;
    lastHP = 40;
})

register('step', () => {
    if (settings.finalDestinationTimer) {
        let finalDestinationPieces = 0;
        for (let i = 1; i < 5; i++) {
            if (playerEntity?.getItemInSlot(i)?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id')?.includes('FINAL_DESTINATION')) finalDestinationPieces += 1;
        }
        
        wearingFD = finalDestinationPieces == 4;
        isSneaking = Player.getPlayer().func_70093_af();
    }
}).setFps(5)

register('attackEntity', () => {
    if (wearingFD && isSneaking && settings.finalDestinationTimer && timeLeft < 0) lastHit = new Date().getTime();
})

register('soundPlay', () => {
    if (wearingFD && isSneaking && settings.finalDestinationTimer && timeLeft < 0) lastHit = new Date().getTime();
}).setCriteria('random.successful_hit')

register('packetReceived', (packet) => {
    if (packet.class.getSimpleName().toString() == 'S06PacketUpdateHealth') {
        if (packet.func_149332_c() < lastHP) {
            lastHP = packet.func_149332_c();
            if (wearingFD && isSneaking && settings.finalDestinationTimer && timeLeft < 0) lastHit = new Date().getTime();
        } else if (packet.func_149332_c() > lastHP) {
            lastHP = packet.func_149332_c();
        }
    }
})

register('renderOverlay', () => {
    if (settings.finalDestinationTimer) {
        if (lastHit) timeLeft = 5 + (lastHit - new Date().getTime()) / 1000;
        if (timeLeft > 0) Renderer.drawString(`${LIGHT_PURPLE + timeLeft.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 17, true);
    }
})
