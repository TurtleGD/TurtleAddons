import settings from "../settings";
import { LIGHT_PURPLE, RED, rune, pling, AQUA, GRAY, WHITE, GREEN } from "../exports";

let gummyTimeLeft;

// Rare drops
register("chat", (message) => {
    if (message.includes(':') || !message.includes('DROP!')) return;

    rareDrops = [
        // Revenant Horror
        'Warden Heart', 'Shard of the Shredded', 'Smite VII', 'Scythe Blade', '◆ Snake Rune I',

        // Tarantula Broodfather
        'Fly Swatter', 'Tarantula Talisman',

        // Sven Packmaster
        'Overflux Capacitor', 'Couture Rune I', 'Grizzly Salmon', 'Red Claw Egg',

        // Voidgloom Seraph
        'Judgement Core', '◆ Enchant Rune I', 'Ender Slayer VII', 'Exceedingly Rare Ender Artifact Upgrader', 'Handy Blood Chalice', 'Pocket Espresso Machine',

        // Riftstalker Bloodfiend
        'Unfanged Vampire Part', "McGrubber's Burger",

        // Inferno Demonlord
        'Duplex I', 'Archfiend Dice', 'High Class Archfiend Dice', "Wilson's Engineering Plans", 'Subzero Inverter', '◆ Fiery Burst Rune I'
    ]

    const regex = /\((.*?)\)/;
    const match = message.match(regex);
    let dropTitle;

    if (match) {
        if (!rareDrops.includes(match[1])) return;

        dropTitle = match[1].toUpperCase();
        if (dropTitle.includes(rune)) dropTitle = dropTitle.slice(2, -2);

        if (settings.sendSlayerDrops) ChatLib.command(`pc ${message}`);

        if (settings.slayerDropTitle) {
            Client.showTitle(`${LIGHT_PURPLE + dropTitle}`, '', 0, 40, 20);
            pling.play();
        };
    };
}).setCriteria("${message}");


// Smoldering polarization warning
register('step', () => {
    if (!settings.gummyWarning) return;
    
    if (ChatLib.removeFormatting(TabList.getFooter()).includes(`Smoldering Polarization I ${settings.gummyTimer}m`) || gummyTimeLeft == settings.gummyTimer) {
        Client.showTitle(`${RED}GUMMY LOW!`, '', 0, 60, 20);
        pling.play();
    }
    gummyTimeLeft -= 1;
}).setDelay(60);

register('command', (arg) => {
    if (!isNaN(parseInt(arg))) {
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Set ${GREEN}Smoldering Polarization I${WHITE} to ${arg}m.`)
        gummyTimeLeft = arg;
    } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Invalid argument, enter an integer.`)
}).setName('gummy')


// Hide attunements
register('chat', (message, event) => {
    if (!settings.hideAttunements) return;
    if (message.startsWith("Strike using the") || message == 'Your hit was reduced by Hellion Shield!') cancel(event)
}).setCriteria("${message}");
