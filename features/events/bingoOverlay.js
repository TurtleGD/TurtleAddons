import settings from "../../settings";
import { AQUA, BOLD, GOLD, GRAY, GREEN, WHITE, YELLOW } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let personalTasks = [];
let communityTasks = [];
let sheet = new Text(pogData.bingoData).setShadow(true);
let inBingo = false;
let showThing = false;
let completedPersonal = 0;
let completedCommunity = 0;

register('worldLoad', () => {
    inBingo = false;
    setTimeout(() => inBingo = Scoreboard.getLines().join('').includes('Ⓑ'), 500);
})

register('step', () => {
    if (settings.bingoOverlay) {
        if (Player?.getContainer()?.getName() == 'Bingo Card') {
            personalTasks.length = 0;
            communityTasks.length = 0;
            completedPersonal = 0;
            completedCommunity = 0;

            for (let i = 0; i < 56; i++) {
                let lore = Player?.getContainer()?.getStackInSlot(i)?.getLore();

                // Uncompleted personal goals
                if (!lore?.join('')?.includes('GOAL REACHED') && lore?.join('')?.includes('Personal Goal')) {
                    if (lore[4] != '') personalTasks.push(lore[3] + ' ' + lore[4]);
                    else personalTasks.push(lore[3]);
                }

                // Completed personal goals
                else if (lore?.join('')?.includes('GOAL REACHED') && lore?.join('')?.includes('Personal Goal')) completedPersonal += 1;

                // Uncompleted community goals
                else if (!lore?.join('')?.includes('GOAL REACHED') && lore?.join('')?.includes('Community Goal')) {
                    if (lore[4] != '') communityTasks.push(lore[3] + ' ' + lore[4]);
                    else communityTasks.push(lore[3]);
                }

                // Completed community goals
                else if (lore?.join('')?.includes('GOAL REACHED') && lore?.join('')?.includes('Community Goal')) completedCommunity += 1;
            }

            personalTasks.push(`${GREEN}(${completedPersonal}/20)`)
            communityTasks.push(`${GREEN}(${completedCommunity}/5)`)

            pogData.bingoData = personalTasks.join('\n') + '\n\n' + communityTasks.join('\n')
            if (completedPersonal + completedCommunity == 25) pogData.bingoData = `${GOLD + BOLD}BINGO COMPLETE!`
            pogData.save();
    
            sheet.setString(pogData.bingoData); 
        }
    }
})

register('renderOverlay', () => {
    if (showThing) {
        Renderer.scale(pogData.bingoOverlayScale);
        Renderer.drawString(`${GRAY}Break ${YELLOW}150M Crop ${GRAY}Blocks.`, pogData.bingoOverlayX, pogData.bingoOverlayY, true);
    } else if (inBingo && settings.bingoOverlay) {
        sheet.setScale(pogData.bingoOverlayScale);
        sheet.draw(pogData.bingoOverlayX, pogData.bingoOverlayY);
    }
})

register('command', (...args) => {
    if (args) {
        if (args[0].toLowerCase() === 'x') {
            if (!isNaN(parseFloat(args[1]))) pogData.bingoOverlayX = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() === 'y') {
            if (!isNaN(parseFloat(args[1]))) pogData.bingoOverlayY = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else if (args[0].toLowerCase() === 'scale') {
            if (!isNaN(parseFloat(args[1]))) pogData.bingoOverlayScale = parseFloat(args[1]);
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use a number.`);
        } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    }
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "x", "y", or "scale".`);
    pogData.save();

    showThing = true;
    setTimeout(() => showThing = false, 2000);
}).setName('movebingooverlay')