import settings from "../../settings";
import { EntityArmorStand } from "../../utils/entities";
import { createWaypoint } from "../../utils/functions";

let goldorPhase = 0;

register('worldLoad', () => {
    goldorPhase = 0;
})

register("chat", (message) => {
    if (message == '[BOSS] Storm: I should have known that I stood no chance.') {
        goldorPhase = 1;
        if (settings.sendTermInChat != 0 && settings.sendTermInChat != 5) ChatLib.command(`pc Doing ${parseInt(settings.sendTermInChat)}`);
        if (settings.sendTermInChat == 5) ChatLib.command('pc Device');
    }

    if ((message.includes('(7/7)') || message.includes('(8/8)')) && !message.includes(':')) goldorPhase += 1;
    if (goldorPhase == 5) goldorPhase = 0;
}).setCriteria("${message}")

let inactive = [];
let active = [];

// is this how threads work
new Thread(() => {
    register('step', () => {
        inactive.length = 0;
        active.length = 0;

        if (settings.highlightTerminals) {
            World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
                // check inactive terms
                if (stand.getName().includes('Inactive')) {
                    for (let x = -2; x < 3; x++) {
                        for (let y = -2; y < 3; y++) {
                            for (let z = -2; z < 3; z++) {
                                let blockName = World.getBlockAt(Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)).type.name;
                                if (blockName == 'Command Block') inactive.push([Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)]);
                            }
                        }
                    }

                    // check inactive devs
                    if (stand.distanceTo(107.5, 119, 93.5) < 5) inactive.push([107.5, 119, 93.5]);
                    if (stand.distanceTo(60, 131, 140) < 5) inactive.push([60, 131, 140]);
                    if (stand.distanceTo(0, 119, 77) < 5) inactive.push([0, 119, 77]);
                    if (stand.distanceTo(63, 126, 35) < 5) inactive.push([63, 127, 35]);
                }

                // check active terms
                if (stand.getName().includes('Active')) {
                    for (let x = -2; x < 3; x++) {
                        for (let y = -2; y < 3; y++) {
                            for (let z = -2; z < 3; z++) {
                                let blockName = World.getBlockAt(Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)).type.name;
                                if (blockName == 'Command Block') active.push([Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)]);
                            }
                        }
                    }

                    // check active devs
                    if (stand.distanceTo(107.5, 119, 93.5) < 5) active.push([107.5, 119, 93.5]);
                    if (stand.distanceTo(60, 131, 140) < 5) active.push([60, 131, 140]);
                    if (stand.distanceTo(0, 119, 77) < 5) active.push([0, 119, 77]);
                    if (stand.distanceTo(63, 126, 35) < 5) active.push([63, 127, 35]);
                }

                // check inactive levers
                if (stand.getName().includes('Not Activated')) {
                    for (let x = -2; x < 3; x++) {
                        for (let y = -2; y < 3; y++) {
                            for (let z = -2; z < 3; z++) {
                                let blockName = World.getBlockAt(Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)).type.name;
                                if (blockName == 'Lever') inactive.push([Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)]);
                            }
                        }
                    }
                }

                // check active levers
                if (stand.getName().includes('Activated') && !stand.getName().includes('Not')) {
                    for (let x = -2; x < 3; x++) {
                        for (let y = -2; y < 3; y++) {
                            for (let z = -2; z < 3; z++) {
                                let blockName = World.getBlockAt(Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)).type.name;
                                if (blockName == 'Lever') active.push([Math.floor(stand.getX() + x), Math.floor(stand.getY() + y), Math.floor(stand.getZ() + z)]);
                            }
                        }
                    }
                }
            })
        }
    }).setFps(5)
}).start();

register('renderWorld', () => {
    if (goldorPhase > 0 && goldorPhase < 5) {
        inactive.forEach(coord => createWaypoint(coord[0], coord[1], coord[2], 1, 0, 0, 0.25, 0.5, false));
        active.forEach(coord => createWaypoint(coord[0], coord[1], coord[2], 0, 1, 0, 0.25, 0.5, false));
    }
})


register('renderWorld', () => {
    if (settings.showTerm != 0) {
        switch (goldorPhase) {
            case 1:
                if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', 111.5, 113.5, 73.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', 111.5, 119.5, 79.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 89.5, 112.5, 92.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', 89.5, 122.5, 101.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 108, 122, 94, Renderer.WHITE, true, 1.5, true);
                break;
    
            case 2:
                if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', 68.5, 109.5, 121.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', 59.5, 120.5, 122.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 47.5, 109.5, 121.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', 39.5, 108.5, 143.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 60.5, 134, 140.5, Renderer.WHITE, true, 1.5, true);
                break;
    
            case 3:
                if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', -2.5, 109.5, 112.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', -2.5, 119.5, 93.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 19.5, 123.5, 93.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', -2.5, 109.5, 77.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 0.5, 121.5, 77.5, Renderer.WHITE, true, 1.5, true);
                break;
    
            case 4:
                if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', 41.5, 109.5, 29.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', 44.5, 121.5, 29.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 67.5, 109.5, 29.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', 72.5, 115.5, 48.5, Renderer.WHITE, true, 1.5, true);
                if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 63.5, 128.5, 35.5, Renderer.WHITE, true, 1.5, true);
                break;
        }
    }
})