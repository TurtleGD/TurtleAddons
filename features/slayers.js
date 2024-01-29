import settings from "../settings";
import { LIGHT_PURPLE, rune } from "../exports";

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
            for (let i = 0; i < 3 ;i++) {
                (function (index) {
                    setTimeout(() => {
                        World.playSound('note.pling', 1.0, 2.0);
                    }, 75 * index);
                })(i);
            };
        };
    };
}).setCriteria("${message}");
