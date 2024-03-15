import settings from "../../settings";
import { WHITE, GRAY, AQUA } from "../../exports";
import { persistentData } from "../../exports";

let instanceStartTime = undefined;
let suppliesPlaced = 0;
let pre = undefined

register('worldLoad', () => {
    instanceStartTime = undefined;
    suppliesPlaced = 0;
    pre = undefined
});

register("chat", (message) => {
    if (settings.recordPreTimes) {
        if (message == '[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!') {
            instanceStartTime = new Date().getTime();
            setTimeout(() => {
                if (Player.getX() < -65 && Player.getX() > -75 && Player.getY() < 82 && Player.getY() > 75 && Player.getZ() < -115 && Player.getZ() > -130) pre = 'triangle'
                if (Player.getX() < -60 && Player.getX() > -75 && Player.getY() < 82 && Player.getY() > 75 && Player.getZ() < -80 && Player.getZ() > -95) pre = 'equals'
                if (Player.getX() < -105 && Player.getX() > -120 && Player.getY() < 82 && Player.getY() > 75 && Player.getZ() < -65 && Player.getZ() > -75) pre = 'slash'
                if (Player.getX() < -125 && Player.getX() > -155 && Player.getY() < 82 && Player.getY() > 70 && Player.getZ() < -130 && Player.getZ() > -170) pre = 'x'
            }, 12000);
        };
    
        if (message.includes(Player.getName()) && message.includes("recovered one of Elle's supplies!") && !message.includes(':')) {
            let placeTime = new Date().getTime();
            let supplyTime = (placeTime - instanceStartTime) / 1000

            if (suppliesPlaced == 0 && pre == 'triangle' && supplyTime < settings.outlierThreshold) persistentData.triangle1.push(supplyTime);
            if (suppliesPlaced == 0 && pre == 'equals' && supplyTime < settings.outlierThreshold) persistentData.equals1.push(supplyTime);
            if (suppliesPlaced == 0 && pre == 'slash' && supplyTime < settings.outlierThreshold) persistentData.slash1.push(supplyTime);
            if (suppliesPlaced == 0 && pre == 'x' && supplyTime < settings.outlierThreshold) persistentData.x1.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'triangle' && supplyTime < settings.outlierThreshold) persistentData.triangle2.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'equals' && supplyTime < settings.outlierThreshold) persistentData.equals2.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'slash' && supplyTime < settings.outlierThreshold) persistentData.slash2.push(supplyTime);
            if (suppliesPlaced == 1 && pre == 'x' && supplyTime < settings.outlierThreshold) persistentData.x2.push(supplyTime);
            if (suppliesPlaced == 0 && supplyTime < settings.outlierThreshold) ChatLib.chat(`registered first pre placement at ${supplyTime}s at ${pre}`)
            if (suppliesPlaced == 1 && supplyTime < settings.outlierThreshold) ChatLib.chat(`registered second pre placement at ${supplyTime}s at ${pre}`)
            persistentData.save();
            
            suppliesPlaced += 1;
        };
    };
}).setCriteria("${message}");

// What the fuck did I just make
register('command', (arg) => {
    if (arg) {
        switch (arg) {
            case 'triangle':
            case 'tri':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on triangle: ${persistentData.triangle1.reduce((a, b) => a + b, 0) / persistentData.triangle1.length.toFixed(3)}s | ${persistentData.triangle2.reduce((a, b) => a + b, 0) / persistentData.triangle2.length.toFixed(3)}s`);
                break;
            case 'equals':
            case 'equal':
            case '=':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on equals: ${persistentData.equals1.reduce((a, b) => a + b, 0) / persistentData.equals1.length.toFixed(3)}s | ${persistentData.equals2.reduce((a, b) => a + b, 0) / persistentData.equals2.length.toFixed(3)}s`);
                break;
            case 'slash':
            case '/':
            case 'line':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on slash: ${persistentData.slash1.reduce((a, b) => a + b, 0) / persistentData.slash1.length.toFixed(3)}s | ${persistentData.slash2.reduce((a, b) => a + b, 0) / persistentData.slash2.length.toFixed(3)}s`);
                break;
            case 'x':
            case 'X':
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times on x: ${persistentData.x1.reduce((a, b) => a + b, 0) / persistentData.x1.length.toFixed(3)}s | ${persistentData.x2.reduce((a, b) => a + b, 0) / persistentData.x2.length.toFixed(3)}s`);
                break;
            default:
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}"${arg}" is not a valid pre.`);
                break;
        };
    } else {
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Average times overall: ${((persistentData.triangle1.reduce((a, b) => a + b, 0) + persistentData.equals1.reduce((a, b) => a + b, 0) + persistentData.slash1.reduce((a, b) => a + b, 0) + persistentData.x1.reduce((a, b) => a + b, 0)) / (persistentData.triangle1.length + persistentData.equals1.length + persistentData.slash1.length + persistentData.x1.length)).toFixed(3)}s | ${((persistentData.triangle2.reduce((a, b) => a + b, 0) + persistentData.equals2.reduce((a, b) => a + b, 0) + persistentData.slash2.reduce((a, b) => a + b, 0) + persistentData.x2.reduce((a, b) => a + b, 0)) / (persistentData.triangle2.length + persistentData.equals2.length + persistentData.slash2.length + persistentData.x2.length)).toFixed(3)}s`);
    };
}).setName('avgpre');

register('command', () => {
    persistentData.triangle1.splice(0, persistentData.triangle1.length)
    persistentData.equals1.splice(0, persistentData.equals1.length)
    persistentData.slash1.splice(0, persistentData.slash1.length)
    persistentData.x1.splice(0, persistentData.x1.length)
    persistentData.triangle2.splice(0, persistentData.triangle2.length)
    persistentData.equals2.splice(0, persistentData.equals2.length)
    persistentData.slash2.splice(0, persistentData.slash2.length)
    persistentData.x2.splice(0, persistentData.x2.length)
    persistentData.save();
    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Cleared all recorded pre times.`);
}).setName('clearpres')
