import settings from "../../../settings";

let inIsle = false;

register('worldLoad', () => {
    setTimeout(() => inIsle = TabList.getNames().join('').includes('Crimson Isle'), 1000);
})

register('soundPlay', (pos, name, vol, pitch, cat, event) => {
    if (settings.quietBlaze && inIsle && (name == 'mob.blaze.breathe' || name.includes('ghast') || name.includes('creeper') || (name == ('random.explosion') && Player.asPlayerMP().distanceTo(pos) > 3))) cancel(event);
})