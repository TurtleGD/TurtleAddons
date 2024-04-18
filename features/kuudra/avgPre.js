import settings from "../../settings";
import { WHITE, GRAY, AQUA } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let instanceStartTime = undefined;
let suppliesPlaced = 0;
let pre = undefined;

register('worldLoad', () => {
    instanceStartTime = undefined;
    suppliesPlaced = 0;
    pre = undefined;
})

register("chat", (message) => {
    if (settings.recordPreTimes) {
        if (message == '[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!') {
            instanceStartTime = new Date().getTime();
            setTimeout(() => {
                if (Player.getX() < -65 && Player.getX() > -75 && Player.getY() < 82 && Player.getY() > 75 && Player.getZ() < -115 && Player.getZ() > -130) pre = 'triangle';
                if (Player.getX() < -60 && Player.getX() > -75 && Player.getY() < 82 && Player.getY() > 75 && Player.getZ() < -80 && Player.getZ() > -95) pre = 'equals';
                if (Player.getX() < -105 && Player.getX() > -120 && Player.getY() < 82 && Player.getY() > 75 && Player.getZ() < -65 && Player.getZ() > -75) pre = 'slash';
                if (Player.getX() < -125 && Player.getX() > -155 && Player.getY() < 82 && Player.getY() > 70 && Player.getZ() < -130 && Player.getZ() > -170) pre = 'x';
            }, 14000)
        }
    
        if (message.includes(Player.getName()) && message.includes("recovered one of Elle's supplies!") && !message.includes(':')) {
            let placeTime = new Date().getTime();
            let supplyTime = (placeTime - instanceStartTime) / 1000;

            if (suppliesPlaced == 0 && pre == 'triangle' && supplyTime < settings.outlierThreshold) pogData.triangle1.push(supplyTime);
            if (suppliesPlaced == 0 && pre == 'equals' && supplyTime < settings.outlierThreshold) pogData.equals1.push(supplyTime);
            if (suppliesPlaced == 0 && pre == 'slash' && supplyTime < settings.outlierThreshold) pogData.slash1.push(supplyTime);
            if (suppliesPlaced == 0 && pre == 'x' && supplyTime < settings.outlierThreshold) pogData.x1.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'triangle' && supplyTime < settings.outlierThreshold) pogData.triangle2.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'equals' && supplyTime < settings.outlierThreshold) pogData.equals2.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'slash' && supplyTime < settings.outlierThreshold) pogData.slash2.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'x' && supplyTime < settings.outlierThreshold) pogData.x2.push(supplyTime);
            pogData.save();
            
            suppliesPlaced += 1;
        }
    }
}).setCriteria("${message}")

// What the fuck did I just make
register('command', (arg) => {
    if (arg) {
        switch (arg) {
            case 'triangle':
            case 'tri':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on triangle: ${(pogData.triangle1.reduce((a, b) => a + b, 0) / pogData.triangle1.length).toFixed(3)}s | ${(pogData.triangle2.reduce((a, b) => a + b, 0) / pogData.triangle2.length).toFixed(3)}s in ${pogData.triangle1.length} | ${pogData.triangle2.length} placements.`);
                break;
            case 'equals':
            case 'equal':
            case '=':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on equals: ${(pogData.equals1.reduce((a, b) => a + b, 0) / pogData.equals1.length).toFixed(3)}s | ${(pogData.equals2.reduce((a, b) => a + b, 0) / pogData.equals2.length).toFixed(3)}s in ${pogData.equals1.length} | ${pogData.equals2.length} placements.`);
                break;
            case 'slash':
            case '/':
            case 'line':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on slash: ${(pogData.slash1.reduce((a, b) => a + b, 0) / pogData.slash1.length).toFixed(3)}s | ${(pogData.slash2.reduce((a, b) => a + b, 0) / pogData.slash2.length).toFixed(3)}s in ${pogData.slash1.length} | ${pogData.slash2.length} placements.`);
                break;
            case 'x':
            case 'X':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on x: ${(pogData.x1.reduce((a, b) => a + b, 0) / pogData.x1.length).toFixed(3)}s | ${(pogData.x2.reduce((a, b) => a + b, 0) / pogData.x2.length).toFixed(3)}s in ${pogData.x1.length} | ${pogData.x2.length} placements.`);
                break;
            default:
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${arg}" is not a valid pre.`);
                break;
        }
    } else {
        const totalFirst = pogData.triangle1.length + pogData.equals1.length + pogData.slash1.length + pogData.x1.length;
        const totalSecond = pogData.triangle2.length + pogData.equals2.length + pogData.slash2.length + pogData.x2.length;
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times overall: ${((pogData.triangle1.reduce((a, b) => a + b, 0) + pogData.equals1.reduce((a, b) => a + b, 0) + pogData.slash1.reduce((a, b) => a + b, 0) + pogData.x1.reduce((a, b) => a + b, 0)) / totalFirst).toFixed(3)}s | ${((pogData.triangle2.reduce((a, b) => a + b, 0) + pogData.equals2.reduce((a, b) => a + b, 0) + pogData.slash2.reduce((a, b) => a + b, 0) + pogData.x2.reduce((a, b) => a + b, 0)) / totalSecond).toFixed(3)}s in ${totalFirst} | ${totalSecond} placements.`);
    }
}).setName('avgpre')

register('command', () => {
    pogData.triangle1.length = 0;
    pogData.equals1.length = 0;
    pogData.slash1.length = 0;
    pogData.x1.length = 0;
    pogData.triangle2.length = 0;
    pogData.equals2.length = 0;
    pogData.slash2.slength = 0;
    pogData.x2.length = 0;
    pogData.save();
    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Cleared all recorded pre times.`);
}).setName('clearpres')