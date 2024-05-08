import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, RESET, GRAY, WHITE } from "../../utils/formatting";

let petXPIndex = undefined;
let showThing = false;
let loadingThing = true;
let noFishingPet = true;
let fishingPetXP = '';

register('step', () => {
    if (!TabList || !TabList?.getNames()) return;
    loadingThing = false;

    if (settings.petXPFishing.length > 0 && TabList?.getNames()) {
        for (let i = 0; i < TabList?.getNames().length; i++) {
            if (TabList?.getNames()[i].includes(settings.petXPFishing) && noFishingPet) {
                petXPIndex = i + 1;
                noFishingPet = false;
                fishingPetXP = TabList?.getNames()[petXPIndex]?.removeFormatting();
                break;
            }
        }
        if (!TabList?.getNames()?.join('').includes('Pet:')) petXPIndex = undefined;

    } else if (settings.petXP && TabList?.getNames()) {
        for (let i = 0; i < TabList?.getNames().length; i++) {
            if (TabList?.getNames()[i].includes('Pet:')) {
                petXPIndex = i + 2;
                break;
            }
        }
        if (!TabList?.getNames()?.join('').includes('Pet:')) petXPIndex = undefined;
    }
}).setDelay(1)

register('worldLoad', () => {
    loadingThing = true;
    petXPIndex = undefined;
})

register('renderOverlay', () => {
    if (!TabList || !TabList?.getNames()) return;

    // Runs before the first check
    if ((settings.petXPFishing.length > 0 || settings.petXP) && loadingThing && petXPIndex === undefined) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} Loading...`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // If no pet equipped
    } else if ((settings.petXPFishing.length > 0 || settings.petXP) && TabList.getNames()[petXPIndex].removeFormatting() == '') {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} No Pet Equipped`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // Equip fishing leveling pet to check xp
    } else if (settings.petXPFishing.length > 0 && noFishingPet) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} Please equip your pet to level.`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // If pet widget off with setting on
    } else if ((settings.petXPFishing.length > 0 || settings.petXP) && petXPIndex === undefined) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} Please enable the Pet Widget.`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // Fishing pet xp
    } else if (!showThing && settings.petXPFishing.length > 0) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP (${settings.petXPFishing}):${RESET}${fishingPetXP}`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // Current pet xp
    } else if (!showThing && settings.petXP && TabList?.getNames()[petXPIndex]) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET}${TabList?.getNames()[petXPIndex].removeFormatting()}`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
    
    // Example value when moving location
    } else if (showThing) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP: ${RESET}0/123,456 (0%)`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
    }
})

register('command', (...args) => {
    if (args) {
        if (args[0].toLowerCase() === 'x') {
            if (!isNaN(parseFloat(args[1]))) pogData.petXPX = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() === 'y') {
            if (!isNaN(parseFloat(args[1]))) pogData.petXPY = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() === 'scale') {
            if (!isNaN(parseFloat(args[1]))) pogData.petXPScale = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('movepetxp')
