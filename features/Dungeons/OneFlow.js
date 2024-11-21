import settings from "../../settings";
import { TileEntityChest, TileEntityPiston } from "../../utils/entities";
import { GRAY, AQUA, WHITE } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

// Big Thanks to Desco and Bro Fuck Dis Shit
const data = JSON.parse(FileLib.read("TurtleAddons", "utils/watertimes.json"));

let pistonColors = new Set(); // Coords of pistons in floor
let chestCoords = [];
let waterboardFound = false;
let waterboardScanned = false;
let direction = -1 // 0 - North, 1 - East, 2 - South, 3 - West
let extendedFloor = ""; // Extended pistons that block chest, 0-5 Purple-Red
let variant = -1;

let waterTimes;

let water;
let clay;
let quartz;
let diamond;
let emerald;
let gold;
let coal;

let running = false;
let gotTimes = false;

register("worldLoad", () => {
    pistonColors.clear();
    chestCoords = [];
    waterboardFound = false;
    waterboardScanned = false;
    direction = -1
    extendedFloor = "";
    variant = -1;

    waterTimes = undefined;

    water = undefined;
    clay = undefined;
    quartz = undefined;
    diamond = undefined;
    emerald - undefined;
    gold = undefined;
    coal = undefined;

    running = false;
    gotTimes = false;
})

register("tick", () => {
    if (!settings.oneFlow || pogData.skyblockArea.includes("Catacombs")) return;

    if (!waterboardFound) World.getAllTileEntitiesOfType(TileEntityPiston).forEach(piston => {
        if (piston.getY() == 57) pistonColors.add(JSON.stringify([piston.getX(), piston.getY(), piston.getZ()]));
    })

    if (pistonColors.size > 0 && !waterboardFound) {
        let [x, y, z] = JSON.parse(Array.from(pistonColors)[0]);
        let waterChestBlock = World.getAllTileEntitiesOfType(TileEntityChest).find(e => {return Math.sqrt(Math.pow(x - e.getX(), 2) + Math.pow(y - e.getY(), 2) + Math.pow(z - e.getZ(), 2)) < 10});
        if (waterChestBlock && !waterboardFound) {
            chestCoords = [waterChestBlock.getX(), waterChestBlock.getY(), waterChestBlock.getZ()];
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Waterboard found.`);
            waterboardFound = true;

            direction = World.getBlockAt(chestCoords[0], chestCoords[1] + 4, chestCoords[2] + 17).type.name == "Lever" ? 0 : -1;
            if (direction == -1) direction = World.getBlockAt(chestCoords[0] - 17, chestCoords[1] + 4, chestCoords[2]).type.name == "Lever" ? 1 : -1;
            if (direction == -1) direction = World.getBlockAt(chestCoords[0], chestCoords[1] + 4, chestCoords[2] - 17).type.name == "Lever" ? 2 : -1;
            if (direction == -1) direction = World.getBlockAt(chestCoords[0] + 17, chestCoords[1] + 4, chestCoords[2]).type.name == "Lever" ? 3 : -1;

            // Yes very optimized I know!
            Client.scheduleTask(20, () => {
                switch (direction) {
                    case 0:
                        for (let i = 3; i <= 7; i++) {
                            if (pistonColors.has(JSON.stringify([chestCoords[0] + 1, chestCoords[1] + 1, chestCoords[2] + i]))) extendedFloor += (i - 3).toString();
                        }
            
                        if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 21, chestCoords[2] - 4).type.name == "Hardened Clay" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 21, chestCoords[2] - 5).type.name == "Hardened Clay") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 21, chestCoords[2] - 4).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 21, chestCoords[2] - 5).type.name == "Block of Gold")) variant = 0;
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] - 4).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] - 5).type.name == "Block of Quartz") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] - 4).type.name == "Block of Emerald" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] - 5).type.name == "Block of Emerald")) variant = 1;
                        }
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] - 4).type.name == "Block of Diamond" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] - 5).type.name == "Block of Diamond") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] - 4).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] - 5).type.name == "Block of Quartz")) variant = 2;
                        }
                        
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] - 4).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] - 5).type.name == "Block of Quartz") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] - 4).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] - 5).type.name == "Block of Gold")) variant = 3;
                        }
                        break;
                    case 1:
                        for (let i = 3; i <= 7; i++) {
                            if (pistonColors.has(JSON.stringify([chestCoords[0] - i, chestCoords[1] + 1, chestCoords[2] + 1]))) extendedFloor += (i - 3).toString();
                        }
                        
                        if ((World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 21, chestCoords[2] + 1).type.name == "Hardened Clay" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 21, chestCoords[2] + 1).type.name == "Hardened Clay") && 
                            (World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 21, chestCoords[2] - 1).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 21, chestCoords[2] - 1).type.name == "Block of Gold")) variant = 0;
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Quartz") && 
                            (World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Emerald" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Emerald")) variant = 1;
                        }
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Diamond" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Diamond") && 
                            (World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Quartz")) variant = 2;
                        }
                        
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Quartz") && 
                            (World.getBlockAt(chestCoords[0] + 4, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] + 5, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Gold")) variant = 3;
                        }
                        break;
                    case 2:
                        for (let i = 3; i <= 7; i++) {
                            if (pistonColors.has(JSON.stringify([chestCoords[0] + 1, chestCoords[1] + 1, chestCoords[2] - i]))) extendedFloor += (i - 3).toString();
                        }
            
                        if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 21, chestCoords[2] + 4).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 21, chestCoords[2] + 5).type.name == "Block of Gold") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 21, chestCoords[2] + 4).type.name == "Hardened Clay" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 21, chestCoords[2] + 5).type.name == "Hardened Clay")) variant = 0;
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] + 4).type.name == "Block of Emerald" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] + 5).type.name == "Block of Emerald") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] + 4).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] + 5).type.name == "Block of Quartz")) variant = 1;
                        }
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] + 4).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] + 5).type.name == "Block of Quartz") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] + 4).type.name == "Block of Diamond" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] + 5).type.name == "Block of Diamond")) variant = 2;
                        }
                        
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] + 4).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] + 1, chestCoords[1] + 22, chestCoords[2] + 5).type.name == "Block of Gold") && 
                            (World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] + 4).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] - 1, chestCoords[1] + 22, chestCoords[2] + 5).type.name == "Block of Quartz")) variant = 3;
                        }
                        break;
                    case 3:
                        for (let i = 3; i <= 7; i++) {
                            if (pistonColors.has(JSON.stringify([chestCoords[0] + i, chestCoords[1] + 1, chestCoords[2] + 1]))) extendedFloor += (i - 3).toString();
                        }
            
                        if ((World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 21, chestCoords[2] + 1).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 21, chestCoords[2] + 1).type.name == "Block of Gold") && 
                            (World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 21, chestCoords[2] - 1).type.name == "Hardened Clay" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 21, chestCoords[2] - 1).type.name == "Hardened Clay")) variant = 0;
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Emerald" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Emerald") && 
                            (World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Quartz")) variant = 1;
                        }
            
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Quartz") && 
                            (World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Diamond" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Diamond")) variant = 2;
                        }
                        
                        if (variant == -1) {
                            if ((World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Gold" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 22, chestCoords[2] + 1).type.name == "Block of Gold") && 
                            (World.getBlockAt(chestCoords[0] - 4, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Quartz" ||
                            World.getBlockAt(chestCoords[0] - 5, chestCoords[1] + 22, chestCoords[2] - 1).type.name == "Block of Quartz")) variant = 3;
                        }
                        break;
                }
                waterboardScanned = true;
            })
        }
    }

    if (waterboardScanned && !gotTimes) {
        waterTimes = data[variant.toString()][extendedFloor];
        
        water = waterTimes["minecraft:water"];
        clay = waterTimes["minecraft:hardened_clay"];
        quartz = waterTimes["minecraft:quartz_block"];
        diamond = waterTimes["minecraft:diamond_block"];
        emerald = waterTimes["minecraft:emerald_block"];
        gold = waterTimes["minecraft:gold_block"];
        coal = waterTimes["minecraft:coal_block"];
        gotTimes = true;
    }
})

register("renderWorld", () => {
    if (waterboardScanned) {
        if (Player.asPlayerMP().distanceTo(chestCoords[0], chestCoords[1], chestCoords[2]) > 25) return;
        switch (direction) {
            case 0:
                if (water !== undefined) water.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 0.5, chestCoords[1] + 5.5 + (index * 0.5), chestCoords[2] + 17.5, Renderer.WHITE, true, 0.025, false)});
                if (quartz !== undefined) quartz.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 4.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 2.5, Renderer.WHITE, true, 0.025, false)});
                if (gold !== undefined) gold.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 4.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 7.5, Renderer.WHITE, true, 0.025, false)});
                if (coal !== undefined) coal.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 4.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 12.5, Renderer.WHITE, true, 0.025, false)});
                if (diamond !== undefined) diamond.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 5.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 2.5, Renderer.WHITE, true, 0.025, false)});
                if (emerald !== undefined) emerald.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 5.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 7.5, Renderer.WHITE, true, 0.025, false)});
                if (clay !== undefined) clay.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 5.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 12.5, Renderer.WHITE, true, 0.025, false)});
                break;
            case 1:
                if (water !== undefined) water.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 16.5, chestCoords[1] + 5.5 + (index * 0.5), chestCoords[2] + 0.5, Renderer.WHITE, true, 0.025, false)});
                if (quartz !== undefined) quartz.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 1.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 4.5, Renderer.WHITE, true, 0.025, false)});
                if (gold !== undefined) gold.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 6.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 4.5, Renderer.WHITE, true, 0.025, false)});
                if (coal !== undefined) coal.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 11.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 4.5, Renderer.WHITE, true, 0.025, false)});
                if (diamond !== undefined) diamond.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 1.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 5.5, Renderer.WHITE, true, 0.025, false)});
                if (emerald !== undefined) emerald.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 6.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 5.5, Renderer.WHITE, true, 0.025, false)});
                if (clay !== undefined) clay.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 11.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 5.5, Renderer.WHITE, true, 0.025, false)});
                break;
            case 2:
                if (water !== undefined) water.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 0.5, chestCoords[1] + 5.5 + (index * 0.5), chestCoords[2] - 16.5, Renderer.WHITE, true, 0.025, false)});
                if (quartz !== undefined) quartz.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 5.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 1.5, Renderer.WHITE, true, 0.025, false)});
                if (gold !== undefined) gold.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 5.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 6.5, Renderer.WHITE, true, 0.025, false)});
                if (coal !== undefined) coal.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 5.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 11.5, Renderer.WHITE, true, 0.025, false)});
                if (diamond !== undefined) diamond.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 4.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 1.5, Renderer.WHITE, true, 0.025, false)});
                if (emerald !== undefined) emerald.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 4.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 6.5, Renderer.WHITE, true, 0.025, false)});
                if (clay !== undefined) clay.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] - 4.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 11.5, Renderer.WHITE, true, 0.025, false)});
                break;
            case 3:
                if (water !== undefined) water.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 17.5, chestCoords[1] + 5.5 + (index * 0.5), chestCoords[2] + 0.5, Renderer.WHITE, true, 0.025, false)});
                if (quartz !== undefined) quartz.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 2.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 5.5, Renderer.WHITE, true, 0.025, false)});
                if (gold !== undefined) gold.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 7.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 5.5, Renderer.WHITE, true, 0.025, false)});
                if (coal !== undefined) coal.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 12.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] + 5.5, Renderer.WHITE, true, 0.025, false)});
                if (diamond !== undefined) diamond.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 2.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 4.5, Renderer.WHITE, true, 0.025, false)});
                if (emerald !== undefined) emerald.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 7.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 4.5, Renderer.WHITE, true, 0.025, false)});
                if (clay !== undefined) clay.forEach((time, index) => {Tessellator.drawString(time <= 0 ? "CLICK ME!" : `${time.toFixed(1)}s`, chestCoords[0] + 12.5, chestCoords[1] + 6.5 + (index * 0.5), chestCoords[2] - 4.5, Renderer.WHITE, true, 0.025, false)});
                break;
        }
    }
})

register("soundPlay", (pos, name) => {
    if (name == "random.click" && waterboardScanned) {
        switch (direction) {
            case 0:
                if (pos.x == chestCoords[0] - 4.5 && pos.z == chestCoords[2] + 2.5 && quartz !== undefined) quartz = quartz.slice(1);
                if (pos.x == chestCoords[0] - 4.5 && pos.z == chestCoords[2] + 7.5 && gold !== undefined) gold = gold.slice(1);
                if (pos.x == chestCoords[0] - 4.5 && pos.z == chestCoords[2] + 12.5 && coal !== undefined) coal = coal.slice(1);
                if (pos.x == chestCoords[0] + 5.5 && pos.z == chestCoords[2] + 2.5 && diamond !== undefined) diamond = diamond.slice(1);
                if (pos.x == chestCoords[0] + 5.5 && pos.z == chestCoords[2] + 7.5 && emerald !== undefined) emerald = emerald.slice(1);
                if (pos.x == chestCoords[0] + 5.5 && pos.z == chestCoords[2] + 12.5 && clay !== undefined) clay = clay.slice(1);
                if (pos.x == chestCoords[0] + 0.5 && pos.z == chestCoords[2] + 17.5 && water !== undefined) {
                    water = water.slice(1);
                    running = true;
                }
                break;
            case 1:
                if (pos.x == chestCoords[0] - 1.5 && pos.z == chestCoords[2] - 4.5 && quartz !== undefined) quartz = quartz.slice(1);
                if (pos.x == chestCoords[0] - 6.5 && pos.z == chestCoords[2] - 4.5 && gold !== undefined) gold = gold.slice(1);
                if (pos.x == chestCoords[0] - 11.5 && pos.z == chestCoords[2] - 4.5 && coal !== undefined) coal = coal.slice(1);
                if (pos.x == chestCoords[0] - 1.5 && pos.z == chestCoords[2] + 5.5 && diamond !== undefined) diamond = diamond.slice(1);
                if (pos.x == chestCoords[0] - 6.5 && pos.z == chestCoords[2] + 5.5 && emerald !== undefined) emerald = emerald.slice(1);
                if (pos.x == chestCoords[0] - 11.5 && pos.z == chestCoords[2] + 5.5 && clay !== undefined) clay = clay.slice(1);
                if (pos.x == chestCoords[0] - 16.5 && pos.z == chestCoords[2] + 0.5 && water !== undefined) {
                    water = water.slice(1);
                    running = true;
                }
                break;
            case 2:
                if (pos.x == chestCoords[0] + 5.5 && pos.z == chestCoords[2] - 1.5 && quartz !== undefined) quartz = quartz.slice(1);
                if (pos.x == chestCoords[0] + 5.5 && pos.z == chestCoords[2] - 6.5 && gold !== undefined) gold = gold.slice(1);
                if (pos.x == chestCoords[0] + 5.5 && pos.z == chestCoords[2] - 11.5 && coal !== undefined) coal = coal.slice(1);
                if (pos.x == chestCoords[0] - 4.5 && pos.z == chestCoords[2] - 1.5 && diamond !== undefined) diamond = diamond.slice(1);
                if (pos.x == chestCoords[0] - 4.5 && pos.z == chestCoords[2] - 6.5 && emerald !== undefined) emerald = emerald.slice(1);
                if (pos.x == chestCoords[0] - 4.5 && pos.z == chestCoords[2] - 11.5 && clay !== undefined) clay = clay.slice(1);
                if (pos.x == chestCoords[0] + 0.5 && pos.z == chestCoords[2] - 16.5 && water !== undefined) {
                    water = water.slice(1);
                    running = true;
                }
                break;
            case 3:
                if (pos.x == chestCoords[0] + 2.5 && pos.z == chestCoords[2] + 5.5 && quartz !== undefined) quartz = quartz.slice(1);
                if (pos.x == chestCoords[0] + 7.5 && pos.z == chestCoords[2] + 5.5 && gold !== undefined) gold = gold.slice(1);
                if (pos.x == chestCoords[0] + 12.5 && pos.z == chestCoords[2] + 5.5 && coal !== undefined) coal = coal.slice(1);
                if (pos.x == chestCoords[0] + 2.5 && pos.z == chestCoords[2] - 4.5 && diamond !== undefined) diamond = diamond.slice(1);
                if (pos.x == chestCoords[0] + 7.5 && pos.z == chestCoords[2] - 4.5 && emerald !== undefined) emerald = emerald.slice(1);
                if (pos.x == chestCoords[0] + 12.5 && pos.z == chestCoords[2] - 4.5 && clay !== undefined) clay = clay.slice(1);
                if (pos.x == chestCoords[0] + 17.5 && pos.z == chestCoords[2] + 0.5 && water !== undefined) {
                    water = water.slice(1);
                    running = true;
                }
                break;
        }
    }
})

register("step", () => {
    if (running) {
        if (water !== undefined) water = water.map(time => time - 0.1);
        if (quartz !== undefined) quartz = quartz.map(time => time - 0.1);
        if (gold !== undefined) gold = gold.map(time => time - 0.1);
        if (coal !== undefined) coal = coal.map(time => time - 0.1);
        if (diamond !== undefined) diamond = diamond.map(time => time - 0.1);
        if (emerald !== undefined) emerald = emerald.map(time => time - 0.1);
        if (clay !== undefined) clay = clay.map(time => time - 0.1);
    }
}).setFps(10)