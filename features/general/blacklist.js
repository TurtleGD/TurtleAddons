import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { AQUA, GRAY, WHITE, STRIKETHROUGH, DARK_GRAY } from "../../utils/formatting";

let found = false;

register('chat', (message) => {
    if (settings.blacklist) {
        if (message.startsWith('Party Finder >')) {
            for (let i = 0; i < pogData.blacklist.length; i++) {
                if (message.includes(pogData.blacklist[i])) {
                    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Attempting to kick ${AQUA + pogData.blacklist[i] + WHITE}.`)
                    ChatLib.command(`p kick ${pogData.blacklist[i]}`)
                }
            }
        }
    }
}).setCriteria("${message}")

register('command', (...args) => {
    switch (args[0]) {
        case 'view':
        case undefined:
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            ChatLib.chat(ChatLib.getCenteredText(`${GRAY}[${AQUA}TurtleAddons Blacklist${GRAY}]`));
            ChatLib.chat(ChatLib.getCenteredText(`${DARK_GRAY}(Click to remove)`));
            ChatLib.chat('');
            for (let i = 0; i < pogData.blacklist.length; i++) new TextComponent(ChatLib.getCenteredText(`${AQUA + pogData.blacklist[i]}`)).setClickAction("run_command").setClickValue(`/blacklist remove ${pogData.blacklist[i]}`).chat()
            ChatLib.chat(ChatLib.getChatBreak(`${STRIKETHROUGH}-`));
            break;
        case 'add':
            if (args[1] == undefined) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Add a name after "add".`);
            else if (!pogData.blacklist.join('').includes(args[1])) {
                pogData.blacklist.push(args[1])
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Added ${AQUA + args[1] + WHITE} to the blacklist.`);
            }
            else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${AQUA + args[1] + WHITE} is already in the blacklist.`);
            break;
        case 'remove':
            for (let i = pogData.blacklist.length - 1; i >= 0; i--) {
                if (pogData.blacklist[i] == args[1]) {
                    pogData.blacklist.splice(i, 1);
                    ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Removed ${AQUA + args[1] + WHITE} from the blacklist.`);
                    found = true;
                }
            }
            if (!found) {
                ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${AQUA + args[1] + WHITE} is not in the blacklist.`);
                found = false;
            }
            break;
        case 'clear':
            pogData.blacklist.splice(0, pogData.blacklist.length);
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Cleared the blacklist.`);
            break;
        default:
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument. Use "view", "add", "remove", or "clear".`);
    }
}).setName('blacklist')