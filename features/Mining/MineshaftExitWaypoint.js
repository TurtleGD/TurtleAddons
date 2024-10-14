import settings from "../../settings";
import { BOLD } from "../../utils/formatting";
import renderBeaconBeam from "../../../BeaconBeam";
import { getArea } from "../../utils/functions";

let exit = [];

// god i need something better than this
register('worldLoad', () => {
    if (settings.mineshaftExitWaypoint) {
        setTimeout(() => {
            if (getArea() != 'Glacite Mineshafts') return;
            new Thread(() => {
                for (let x = -10; x < 10; x++) {
                    for (let y = -5; y < 5; y++) {
                        for (let z = -10; z <10; z++) {
                            if (World.getBlockAt(Player.getX() + x, Player.getY() + y, Player.getZ() + z).type.name == 'End Portal') {
                                exit.push(Math.floor(Player.getX() + x), Math.floor(Player.getY() + y), Math.floor(Player.getZ() + z));
                                return;
                            }
                        }
                    }
                }
            }).start()
        }, 2000)   
    }
})

register('worldUnload', () => {
    exit.length = 0;
})

register('renderWorld', () => {
    if (settings.mineshaftExitWaypoint && exit[0]) {
        Tessellator.drawString(`${BOLD}Exit`, exit[0] + 1.5, exit[1] + 4, exit[2] + 1.5, Renderer.WHITE, true, 1.5, true);
        renderBeaconBeam(exit[0] + 1, exit[1] + 4, exit[2] + 1, 1, 1, 1, 0.5, false);
    }
})