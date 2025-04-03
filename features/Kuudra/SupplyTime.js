import settings from "../../settings";

function formatFloatSeconds(seconds) {
    let totalSeconds = parseFloat(seconds);

    let minutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = (totalSeconds % 60).toFixed(2);

    let timeString = [
        `${minutes > 0 ? minutes + 'm' : ''}`,
        `${remainingSeconds}s`
    ].join(' ').trim();

    return timeString;
}

let p1Start = 0;

register("worldLoad", () => {
    p1Start = 0;
})

register("chat", () => {
    p1Start = new Date().getTime();
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!")

register("chat", (player, supply, event) => {
    if (settings.supplyTimes) {
        let time = ((new Date().getTime() - p1Start) / 1000).toFixed(2);
        ChatLib.chat(`${player}&a&lrecovered a supply at ${formatFloatSeconds(time)}!${supply}`);
        cancel(event);
    }
}).setCriteria(/(.+)&a&lrecovered one of Elle's supplies!(.+)/)