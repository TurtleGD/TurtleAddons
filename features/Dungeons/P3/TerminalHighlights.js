import settings from "../../../settings";
import { EntityArmorStand } from "../../../utils/entities";
import { createWaypoint } from "../../../utils/functions";
import { pogData } from '../../../utils/pogData';

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
    if (pogData.goldorPhase > 0 && pogData.goldorPhase < 5) {
        inactive.forEach(coord => createWaypoint(coord[0], coord[1], coord[2], 1, 0, 0, 0.25, 0.5, false));
        active.forEach(coord => createWaypoint(coord[0], coord[1], coord[2], 0, 1, 0, 0.25, 0.5, false));
    }
})