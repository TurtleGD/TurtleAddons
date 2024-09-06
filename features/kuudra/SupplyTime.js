import settings from '../../settings.js';

let p1Start = undefined;

register('worldLoad', () => {
    p1Start = undefined;
})

register("chat", () => {
    p1Start = new Date().getTime();
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!"),

register("chat", (player, supply, event) => {
    if (!settings.supplyTimes) return;
    let time = ((new Date().getTime() - p1Start) / 1000).toFixed(2);
    ChatLib.chat(`${player}&a&lrecovered a supply at ${time}s!${supply}`);
    cancel(event);
}).setCriteria(/(.+)&a&lrecovered one of Elle's supplies!(.+)/)