import RenderLib from "../../../RenderLib";
import settings from "../../settings";

let punchedPlayers = [];
let inRift = false;

register('worldLoad', () => {
    punchedPlayers.length = 0
    setTimeout(() => {inRift = TabList?.getNames()?.join('').includes('The Rift')}, 1000)
})

register('chat', (message) => {
    if (settings.punchcardArtifact && message.startsWith('PUNCHCARD!')) {
        let nameArray = message.replace('PUNCHCARD! You punched ', '').replace(' and both regained +25ф Rift Time!', '').split(' ');
        punchedPlayers.push(nameArray[nameArray.length - 1]);
    }
}).setCriteria("${message}")

register('renderWorld', () => {
    World.getAllPlayers().forEach(player => {
        if (punchedPlayers.includes(player.getName()) && player.getName() != Player.getName()) RenderLib.drawEspBox(player.getX(), player.getY(), player.getZ(), 0.85, 2, 0, 1, 0, 0.5, false);
    })
})