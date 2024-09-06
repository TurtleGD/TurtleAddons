import settings from "../../settings";
import { GOLD } from "../../utils/formatting";

/*
4/4 Crimson stacks - 11s
3/4 Crimson stacks - 8s
2/4 Crimson stacks - 5s
1/4 Crimson stacks - 1s

Helmet - Slot 4
Chestplate - Slot 3
Leggings - Slot 2
Boots - Slot 1
*/

let playerEntity = undefined;
let wearingCrimsonPieces = 0;
let crimsonStacks = 0;
let lastKill = undefined;

register('worldLoad', () => {
    setTimeout(() => playerEntity = new EntityLivingBase(Player?.asPlayerMP()?.getEntity()), 500);
    wearingCrimsonPieces = 0;
    crimsonStacks = 0;
    lastKill = undefined;
})

register("actionBar", (message) => {
    if (settings.crimsonTimer) {
        if (message.includes('ᝐ')) {
            const match = message.match(/(\d+)(?=\s*ᝐ)/);
    
            if (match) {
                const num = match[0]; 
                crimsonStacks = parseInt(num);
            }
        }
        else crimsonStacks = 0; 
    }
}).setCriteria("${message}");

register('soundPlay', () => {
    if (settings.crimsonTimer) {
        lastKill = new Date().getTime();

        let crimsonPieces = 0;
        for (let i = 1; i < 5; i++) {
            if (playerEntity?.getItemInSlot(i)?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id')?.includes('CRIMSON')) crimsonPieces += 1;
        }
        wearingCrimsonPieces = crimsonPieces;
    }
}).setCriteria('tile.piston.in')

register('renderOverlay', () => {
    if (settings.crimsonTimer) {
        let cooldown = undefined;
        switch (wearingCrimsonPieces) {
            case 1:
                cooldown = 1;
                break;
            case 2:
                cooldown = 5;
                break;
            case 3:
                cooldown = 8;
                break;
            case 4:
                cooldown = 11;
                break;
        }
        let timeLeft = cooldown + (lastKill - new Date().getTime()) / 1000;
        if (timeLeft > 0 && crimsonStacks == 10) Renderer.drawString(`${GOLD + timeLeft.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 7, true);
    }
})
