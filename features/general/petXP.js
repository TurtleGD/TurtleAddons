import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, RESET, GRAY, WHITE } from "../../utils/formatting";

let petXPIndex = undefined;
let showPetXP = false;
let loadingThing = true;
let noFishingPet = true
let fishingPetXP = ''

register('step', () => {
    loadingThing = false;

    if (settings.petXPFishing.length > 0) {
        for (let i = 0; i < TabList.getNames().length; i++) {
            if (TabList.getNames()[i].includes(settings.petXPFishing) && noFishingPet) {
                petXPIndex = i + 1;
                noFishingPet = false;
                fishingPetXP = TabList.getNames()[petXPIndex].removeFormatting()
                break;
            }
        }
        if (!TabList.getNames().join('').includes('Pet:')) petXPIndex = undefined;

    } else if (settings.petXP) {
        for (let i = 0; i < TabList.getNames().length; i++) {
            if (TabList.getNames()[i].includes('Pet:')) {
                petXPIndex = i + 2;
                break;
            }
        }
        if (!TabList.getNames().join('').includes('Pet:')) petXPIndex = undefined;
    }
}).setDelay(1)

register('worldLoad', () => {
    loadingThing = true;
    petXPIndex = undefined;
})

register('renderOverlay', () => {
    // Runs before the first check
    if ((settings.petXPFishing.length > 0 || settings.petXP) && loadingThing && petXPIndex == undefined) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} Loading...`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // If pet widget off with setting on
    } else if (settings.petXPFishing.length > 0 && noFishingPet) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} Please equip your pet to level.`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
    } else if ((settings.petXPFishing.length > 0 || settings.petXP) && petXPIndex == undefined) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET} Please enable the Pet Widget.`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // Fishing pet xp
    } else if (!showPetXP && settings.petXPFishing.length > 0) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP (${settings.petXPFishing}):${RESET}${fishingPetXP}`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // Current pet xp
    } else if (!showPetXP && settings.petXP) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP:${RESET}${TabList.getNames()[petXPIndex].removeFormatting()}`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);

    // Example value when moving location
    } else if (showPetXP) {
        Renderer.scale(pogData.petXPScale);
        Renderer.drawString(`${AQUA}Pet XP: ${RESET}0/123,456 (0%)`, pogData.petXPX / pogData.petXPScale, pogData.petXPY / pogData.petXPScale, true);
    }
})

register('command', (...args) => {
    if (args) {
        if (args[0].toLowerCase() == 'x') {
            if (!isNaN(parseInt(args[1]))) pogData.petXPX = parseInt(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'y') {
            if (!isNaN(parseInt(args[1]))) pogData.petXPY = parseInt(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() == 'scale') {
            if (!isNaN(parseInt(args[1]))) pogData.petXPScale = parseInt(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000)
}).setName('movepetxp')
