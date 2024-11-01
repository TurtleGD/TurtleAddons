import settings from "../../settings";
import { GRAY, AQUA, WHITE } from "../../utils/formatting";
import { getArea } from "../../utils/functions";

let rooms = settings.roomName.toLowerCase().split(/\s*,\s*/);
let inCata = false;

register('worldLoad', () => {
    rooms = settings.roomName.toLowerCase().split(/\s*,\s*/);
    setTimeout(() => inCata = getArea()?.includes('Catacombs'), 2000);
});

// Dungeon room thing why does this stupid function only work if it has a try catch
function roomFromId(roomId) {
    try {
        // File copied over from BetterMap
        const data = JSON.parse(FileLib.read('TurtleAddons', 'utils/roomdata.json'));

        for (const obj of data) {
            if (obj.id && Array.isArray(obj.id) && obj.id.includes(roomId)) return obj.name;
        };
        return null;

    } catch (error) {
        console.log(error);
        return null;
    }
}

// Get dungeon room
register('command', () => {
    const match = Scoreboard.getLineByIndex(Scoreboard.getLines().length - 1).toString().removeFormatting().match(/(-?\d+),(-?\d+)\b/);

    if (match) {
        if (roomFromId(match.slice(1).toString()) == null) ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Room not recognized.`)
        else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Current room: ${roomFromId(match.slice(1).toString())}.`)
    } else ChatLib.chat(`${GRAY}[${AQUA}TurtleAddons${GRAY}] ${WHITE}Cannot detect room.`)
}).setName('getroom')

register('tick', () => {
    if (settings.sendRoomEntryMessage && inCata) {
        const match = Scoreboard?.getLineByIndex(Scoreboard?.getLines().length - 1)?.toString()?.removeFormatting()?.match(/(-?\d+),(-?\d+)\b/);

        if (match) {
            const currentRoom = roomFromId(match.slice(1).toString())?.toLowerCase();
            if (rooms.includes(currentRoom)) {
                ChatLib.command(`pc ${settings.roomEntryMessage.replace('[name]', roomFromId(match.slice(1).toString()))}`);
                rooms.splice(rooms.indexOf(currentRoom), 1);
            }
        }
    }
})