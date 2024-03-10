import settings from "../settings";
import { LIGHT_PURPLE, RED, rune, pling, AQUA, GRAY, WHITE, GREEN, persistentData, removeEmojis, getArea, EntityArmorStand } from "../exports";

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
    if (!settings.gummyWarning || (!Scoreboard.getTitle().includes('SKYBLOCK') && !removeEmojis(Scoreboard.getLinesByScore(1).join('')) == 'ewww.hypixel.neet') || getArea().includes('Catacombs')) return;

    if (persistentData.gummyTimeLeft > 0) persistentData.gummyTimeLeft -= 1;
    
    if (persistentData.gummyTimeLeft == settings.gummyTimer * 60) {
        Client.showTitle(`${RED}GUMMY LOW!`, '', 0, 60, 20);
        pling.play();
        ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE + settings.gummyTimer}m of ${GREEN}Smoldering Polarization I ${WHITE}left.`);
    }
    persistentData.save();
}).setDelay(1);

register('command', () => {
    if (persistentData.gummyTimeLeft != 0) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE + Math.floor(persistentData.gummyTimeLeft / 60)}m ${persistentData.gummyTimeLeft % 60}s of ${GREEN}Smoldering Polarization I ${WHITE}left.`)
    else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${GREEN}Smoldering Polarization I ${WHITE}is inactive.`)
}).setName('gummy')

register('chat', (message) => {
    if (!settings.gummyWarning) return;
    if (message == 'You ate a Re-heated Gummy Polar Bear!') persistentData.gummyTimeLeft = 3599
    persistentData.save();
}).setCriteria("${message}");


// Hide attunements
register('chat', (message, event) => {
    if (!settings.hideAttunements) return;
    if (message.startsWith("Strike using the") || message == 'Your hit was reduced by Hellion Shield!') cancel(event)
}).setCriteria("${message}");


// Boss kill time
let bossSpawn = false;
let spawnTime = undefined;
let killTime = undefined;
let x = undefined;
let y = undefined;
let z = undefined;

register('tick', () => {
    if (!settings.slayerKillTime) return;

    World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
        let name = stand.getName().removeFormatting();

        // Checks spawned by name tag
        if (name.includes(`Spawned by: ${Player.getName()}`) && spawnTime == undefined && removeEmojis(Scoreboard.getLinesByScore(5).join('')).includes('Slayer Quest')) {
            bossSpawn = true;
            spawnTime = new Date().getTime();
            killTime = undefined;
        };

        // Gets spawned by name tag location for boss check later
        if (name.includes(`Spawned by: ${Player.getName()}`)) {
            x = stand.getX();
            y = stand.getY();
            z = stand.getZ();
        };

        // Checks hp name tag to spawned by name tag to check whos boss
        if (name.includes(' 0❤') && killTime == undefined && Math.hypot(stand.getX() - x, stand.getY() - y, stand.getZ() - z) < 1) {
            bossSpawn = false;
            killTime = new Date().getTime();
            ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Slayer took ${((killTime - spawnTime) / 1000).toFixed(3)}s to kill!`);
            setTimeout(() => spawnTime = undefined, 3000);
        };
    });
});

register('chat', (message) => {
    if (!settings.slayerKillTime) return;
    
    if ((message.includes('SLAYER QUEST FAILED!') && !message.includes(':')) || message.includes('Your Slayer Quest has been cancelled!')) setTimeout(() => spawnTime = undefined, 500)
}).setCriteria("${message}");
