import settings from "../../settings";
import RenderLib from "../../../RenderLib/index.js";

let r = 0;
let g = 0;
let b = 0;
let rgb = 0;

register('tick', () => {
    if (settings.rgbGyro > 0) {
        // Wtf did ChatGPT cook
        r = (Math.sin(rgb / 20 + 0) * 127 + 128) / 255;
        g = (Math.sin(rgb / 20 + 2) * 127 + 128) / 255;
        b = (Math.sin(rgb / 20 + 4) * 127 + 128) / 255;

        rgb += settings.rgbGyro;
    }
})

register('renderWorld', () => {
    if (settings.gyroDisplay) {

        if (Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') != 'GYROKINETIC_WAND') return;

        let block = new BlockPos(Player.getPlayer().func_174822_a(25, 0).func_178782_a()); // Credits to Bloom
        let x = block.getX();
        let y = block.getY();
        let z = block.getZ();

        if (settings.rgbGyro > 0) {
            if (World.getBlockAt(x, y, z).type.name != 'tile.air.name' && World.getBlockAt(x, y + 1, z).type.name == 'tile.air.name') {
                if (World.getBlockAt(x, y, z).type.name == 'Carpet') {
                    RenderLib.drawDisk(x + 0.5, y + 0.15, z + 0.5, 10 - (settings.gyroRing / 10), 10, 100, 1, 90, 0, 0, r, g, b, settings.gyroOpacity / 100, false, false);
                    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 0.0625, r, g, b, settings.gyroOpacity / 100, true);
                }
                else {
                    RenderLib.drawDisk(x + 0.5, y + 1.15, z + 0.5, 10 - (settings.gyroRing / 10), 10, 100, 1, 90, 0, 0, r, g, b, settings.gyroOpacity / 100, false, false);
                    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, r, g, b, settings.gyroOpacity / 100, true);
                }
            }
        } else {
            if (World.getBlockAt(x, y, z).type.name != 'tile.air.name' && World.getBlockAt(x, y + 1, z).type.name == 'tile.air.name') {
                if (World.getBlockAt(x, y, z).type.name == 'Carpet') {
                    RenderLib.drawDisk(x + 0.5, y + 0.15, z + 0.5, 10 - (settings.gyroRing / 10), 10, 100, 1, 90, 0, 0, settings.gyroColor.getRed() / 255, settings.gyroColor.getGreen() / 255, settings.gyroColor.getBlue() / 255, settings.gyroOpacity / 100, false, false);
                    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 0.0625, settings.gyroColor.getRed() / 255, settings.gyroColor.getGreen() / 255, settings.gyroColor.getBlue() / 255, settings.gyroOpacity / 100, true);
                }
                else {
                    RenderLib.drawDisk(x + 0.5, y + 1.15, z + 0.5, 10 - (settings.gyroRing / 10), 10, 100, 1, 90, 0, 0, settings.gyroColor.getRed() / 255, settings.gyroColor.getGreen() / 255, settings.gyroColor.getBlue() / 255, settings.gyroOpacity / 100, false, false);
                    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, settings.gyroColor.getRed() / 255, settings.gyroColor.getGreen() / 255, settings.gyroColor.getBlue() / 255, settings.gyroOpacity / 100, true);
                }
            }
        }
    }  
})