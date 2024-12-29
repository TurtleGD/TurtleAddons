import settings from "../../../settings";
import { removeEmojis } from "../../../utils/functions";

let fireballs = [
    Java.type("net.minecraft.entity.projectile.EntityFireball").class, 
    Java.type("net.minecraft.entity.projectile.EntitySmallFireball").class, 
    Java.type("net.minecraft.entity.projectile.EntityLargeFireball").class
];

let inBoss = false;

register("worldLoad", () => {
    inBoss = false;
})

register("step", () => {
    inBoss = removeEmojis(Scoreboard.getLines().join("")).includes("Slay the boss!");
}).setFps(5);

register("renderEntity", (entity, pos, partialTick, event) => {
    if (settings.hideFireballs && inBoss) cancel(event);
}).setFilteredClasses(fireballs);

