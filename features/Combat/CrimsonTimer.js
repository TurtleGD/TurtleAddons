import settings from "../../settings";
import { GOLD } from "../../utils/formatting";
import { S32PacketConfirmTranscation } from "../../utils/packets";

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
let crimsonPieces = 0;
let crimsonStacks = 0;
let ticks = 0;
let text = new Text("").setShadow(true).setAlign("CENTER");

register('worldLoad', () => {
    setTimeout(() => playerEntity = new EntityLivingBase(Player?.asPlayerMP()?.getEntity()), 500);
    crimsonPieces = 0;
    crimsonStacks = 0;
    ticks = 0;
});

register("packetReceived", () => {
    if (ticks) {
        ticks -= 1;
        text.setString(GOLD + (ticks * 0.05).toFixed(2));
    }
}).setFilteredClass(S32PacketConfirmTranscation)

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
        crimsonPieces = 0;
        for (let i = 1; i < 5; i++) {
            if (playerEntity?.getItemInSlot(i)?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id')?.includes('CRIMSON')) crimsonPieces += 1;
        }

        switch (crimsonPieces) {
            case 1:
                ticks = 20;
                break;
            case 2:
                ticks = 100;
                break;
            case 3:
                ticks = 160;
                break;
            case 4:
                ticks = 220;
                break;
            
        }
    }
}).setCriteria('tile.piston.in');

register('renderOverlay', () => {
    if (ticks && crimsonStacks == 10) text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 + 10);
})