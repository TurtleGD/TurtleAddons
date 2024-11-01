import settings from "../../../settings";
import { S2DPacketOpenWindow, S2EPacketCloseWindow, C0DPacketCloseWindow } from "../../../utils/packets";

const terminals = [
    /^What starts with: '(\w)'\?$/,
    /^Click in order!$/,
    /^Click the button on time!$/,
    /^Select all the ([\w ]+) items!$/,
    /^Change all to same color!$/,
    /^Correct all the panes!$/
];

let inTerminal = false;
let defaultScale = 2;

register("worldLoad", () => {
    defaultScale = Client.settings.video.getGuiScale();
})

// Opening terminal
register("packetReceived", (packet) => {
    if (settings.terminalGuiScale) {
        let containerTitle = packet.func_179840_c().func_150260_c(); // packet.getWindowTitle().getUnformattedText()
        if (terminals.some(regex => regex.test(containerTitle))) {
            inTerminal = true;
            Client.settings.video.setGuiScale(settings.terminalGuiScale);
        }
    }
}).setFilteredClass(S2DPacketOpenWindow);


// Closing terminal client side with esc or e or whatever
register("packetSent", () => {
    if (inTerminal) {
        inTerminal = false;
        Client.settings.video.setGuiScale(defaultScale);    
    }
}).setFilteredClass(C0DPacketCloseWindow);

// Closing terminal server side when terminal is done
register("packetReceived", () => {
    if (inTerminal) {
        inTerminal = false;
        Client.settings.video.setGuiScale(defaultScale);    
    }
}).setFilteredClass(S2EPacketCloseWindow);