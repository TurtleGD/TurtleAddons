import settings from "../settings";
import { createWaypoint, getArea } from "../exports";

let witherKingMessageSent = false;
let witherKingMessageTime;

let holdingRelic;
let goldorPhase = 0;
let inMaxor = false;
let earlyP2MessageSent = false;

let bonzoTime;
let bonzoInvinicibility = false;
let spiritTime;
let spiritInvinicibility = false;
let phoenixTime;
let phoenixInvinicibility = false;

let rooms = settings.roomName.toLowerCase().split(', ')

register('worldLoad', () => {
    witherKingMessageSent = false;
    holdingRelic = undefined;
    goldorPhase = 0;
    inMaxor = false;
    earlyP2MessageSent = false;
    bonzoInvinicibility = false;
    spiritInvinicibility = false;
    phoenixInvinicibility = false;
    rooms = settings.roomName.toLowerCase().split(', ')
});

// Term stuff
register("chat", (message) => {
    if (settings.sendTermInChat == 0 && settings.showTerm == 0) return;

    if (message == '[BOSS] Storm: I should have known that I stood no chance.') {
        goldorPhase = 1;
        if (settings.sendTermInChat != 0 && settings.sendTermInChat != 5) ChatLib.command(`pc Doing ${parseInt(settings.sendTermInChat)}`);
        if (settings.sendTermInChat == 5) ChatLib.command('pc Device');
    };

    if ((message.includes('(7/7)') || message.includes('(8/8)')) && !message.includes(':')) goldorPhase += 1;
    if (goldorPhase == 5) goldorPhase = 0;
}).setCriteria("${message}");

// P5 rag timer start
register("chat", (message) => {
    if (!settings.p5RagTimer) return;

    if (message == '[BOSS] Wither King: You.. again?') {
        witherKingMessageTime = new Date().getTime();
        witherKingMessageSent = true;
        holdingRelic = undefined;
    };
}).setCriteria("${message}");

// P2 early entry maxor check
register("chat", (message) => {
    if (settings.p2EntryMessage.length == 0) return;

    if (message.includes("I'VE BEEN TOLD I COULD HAVE A BIT OF FUN WITH YOU")) inMaxor = true;
    if (message.includes("I'M TOO YOUNG TO DIE AGAIN")) inMaxor = false; 
}).setCriteria("${message}");

// Drag skip title
register("chat", (message) => {
    if (!settings.dragSkipTitle) return;

    switch (message) {
        case "[BOSS] Wither King: Your skills have faded humans.":
        case "[BOSS] Wither King: I am not impressed.":
        case "[BOSS] Wither King: Futile.":
        case "[BOSS] Wither King: You just made a terrible mistake!":
            Client.showTitle(' ', `NO SKIP`, 0, 20, 0);
            break;
        case "[BOSS] Wither King: Oh, this one hurts!":
        case "[BOSS] Wither King: My soul is disposable.":
        case "[BOSS] Wither King: I have more of those.":
            Client.showTitle(' ', `SKIPPED`, 0, 20, 0);
            break;
    }
}).setCriteria("${message}");

// Invincibility timers
register("chat", (message) => {
    if (!settings.bonzoInvinicibility) return;

    if (message == "Your Bonzo's Mask saved your life!" || message == "Your ⚚ Bonzo's Mask saved your life!") {
        bonzoTime = new Date().getTime();
        bonzoInvinicibility = true
        spiritInvinicibility = false
        phoenixInvinicibility = false
    }
}).setCriteria("${message}");

register("chat", (message) => {
    if (!settings.spiritInvinicibility) return;

    if (message == "Second Wind Activated! Your Spirit Mask saved your life!") {
        spiritTime = new Date().getTime();
        bonzoInvinicibility = false
        spiritInvinicibility = true
        phoenixInvinicibility = false
    }
}).setCriteria("${message}");

register("chat", (message) => {
    if (!settings.phoenixInvinicibility) return;

    if (message == 'Your Phoenix Pet saved you from certain death!') {
        phoenixTime = new Date().getTime();
        bonzoInvinicibility = false
        spiritInvinicibility = false
        phoenixInvinicibility = true
    }
}).setCriteria("${message}");

// Early P2 entry message
register('tick', () => {
    if (!earlyP2MessageSent && settings.p2EntryMessage.length != 0 && Player.getY() < 205 && inMaxor) {
        ChatLib.command(`pc ${settings.p2EntryMessage}`);
        earlyP2MessageSent = true
    }
});

// Rag/bonzo/phoenix timer
register("renderOverlay", () => {
    if (witherKingMessageSent) {
        let timeLeftRag = new Date().getTime();
        timeLeftRag = 5 - (timeLeftRag - witherKingMessageTime) / 1000;
        if (timeLeftRag >= 0) Renderer.drawString(`Use Rag in: ${timeLeftRag.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 40, Renderer.screen.getHeight() / 2 + 6);
    };

    if (bonzoInvinicibility) {
        let timeLeftBonzo = new Date().getTime();
        timeLeftBonzo = 3 - (timeLeftBonzo - bonzoTime) / 1000;
        if (timeLeftBonzo >= 0) Renderer.drawString(`${timeLeftBonzo.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 6);
        if (timeLeftBonzo < 0) {
            bonzoInvinicibility = false;
        }
    };

    if (spiritInvinicibility) {
        let timeLeftSpirit = new Date().getTime();
        timeLeftSpirit = 3 - (timeLeftSpirit - spiritTime) / 1000;
        if (timeLeftSpirit >= 0) Renderer.drawString(`${timeLeftSpirit.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 6);
        if (timeLeftSpirit < 0) {
            spiritInvinicibility = false;
        }
    };

    if (phoenixInvinicibility) {
        let timeLeftPhoenix = new Date().getTime();
        timeLeftPhoenix = (2 + (settings.phoenixLevel * 0.02)) - (timeLeftPhoenix - phoenixTime) / 1000;
        if (timeLeftPhoenix >= 0) Renderer.drawString(`${timeLeftPhoenix.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 6);
        if (timeLeftPhoenix < 0) {
            phoenixInvinicibility = false;
        }
    };
});

// Early P2 entry message
register('tick', () => {
    if (!earlyP2MessageSent && settings.p2EntryMessage.length != 0 && Player.getY() < 205 && inMaxor) {
        let regex = new RegExp(`${Player.getName()}(?:\\s[^\\s]+\\s)?\\((.*?)\\)`);
        let match = TabList.getNames().map(a => a.removeFormatting()).join(", ").match(regex);
        if (match[1].includes('Mage')) {
            ChatLib.command(`pc ${settings.p2EntryMessage}`);
            earlyP2MessageSent = true
        }
    }
});

// Gets relic color from message
register("chat", (relicPicker, relicColor) => {
    if (Player.getName() == relicPicker) holdingRelic = relicColor;
}).setCriteria("${relicPicker} picked the Corrupted ${relicColor} Relic!");

// Terminal text waypoint thing
register('renderWorld', () => {
    if (settings.showTerm == 0) return;

    switch (goldorPhase) {
        case 1:
            if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', 111.5, 113.5, 73.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', 111.5, 119.5, 79.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 89.5, 112.5, 92.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', 89.5, 122.5, 101.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 108, 122, 94, Renderer.WHITE, true, 1.5, true);
        break;

        case 2:
            if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', 68.5, 109.5, 121.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', 59.5, 120.5, 122.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 47.5, 109.5, 121.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', 39.5, 108.5, 143.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 60.5, 134, 140.5, Renderer.WHITE, true, 1.5, true);
        break;

        case 3:
            if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', -2.5, 109.5, 112.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', -2.5, 119.5, 93.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 19.5, 123.5, 93.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', -2.5, 109.5, 77.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 0.5, 121.5, 77.5, Renderer.WHITE, true, 1.5, true);
        break;

        case 4:
            if (settings.showTerm == 1 || settings.showTerm == 6) Tessellator.drawString('1', 41.5, 109.5, 29.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 2 || settings.showTerm == 6) Tessellator.drawString('2', 44.5, 121.5, 29.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 3 || settings.showTerm == 6) Tessellator.drawString('3', 67.5, 109.5, 29.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 4 || settings.showTerm == 6) Tessellator.drawString('4', 72.5, 115.5, 48.5, Renderer.WHITE, true, 1.5, true);
            if (settings.showTerm == 5 || settings.showTerm == 6) Tessellator.drawString('Device', 63.5, 128.5, 35.5, Renderer.WHITE, true, 1.5, true);
        break;
    };
});

// Waypoints for relic cauldrons
register('renderWorld', () => {
    if (!settings.relicHelper) return;

    switch (holdingRelic) {
        case "Red":
            createWaypoint(51, 7, 42, 255, 0, 0, 0.25, 1, false);
            break;
        case "Orange":
            createWaypoint(57, 7, 42, 255, 1, 0, 0.125, 0.5, false);
            createWaypoint(57, 7, 42, 255, 0, 0, 0.125, 0.5, true);
            break;
        case "Blue":
            createWaypoint(59, 7, 44, 0, 0, 255, 0.25, 1, false);
            break;
        case "Purple":
            createWaypoint(54, 7, 41, 255, 0, 255, 0.25, 1, false);
            break;
        case "Green":
            createWaypoint(49, 7, 44, 0, 255, 0, 0.25, 1, false);
            break;
    };
});


// Dungeon room thing why does this stupid function only work if it has a try catch
function roomFromId(roomId) {
    try {
        const data = JSON.parse(FileLib.read('TurtleAddons', 'roomdata.json'));

        for (const obj of data) {
            if (obj.id && Array.isArray(obj.id) && obj.id.includes(roomId)) {
                return obj.name;
            }
        }

        ChatLib.chat('Room not recognized.');
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

register('command', () => {
    const match = Scoreboard.getLineByIndex(Scoreboard.getLines().length - 1).toString().removeFormatting().match(/(-?\d+),(-?\d+)\b/);

    if (match) ChatLib.chat(roomFromId(match.slice(1).toString()));
}).setName('getroom');

register('tick', () => {
    if (!settings.sendRoomEntryMessage) return;
    if (!getArea().includes('Catacombs')) return;

    const match = Scoreboard.getLineByIndex(Scoreboard.getLines().length - 1).toString().removeFormatting().match(/(-?\d+),(-?\d+)\b/);

    if (match) {
        const currentRoom = roomFromId(match.slice(1).toString()).toLowerCase()
        if (rooms.includes(currentRoom)) {
            ChatLib.command(`pc ${settings.roomEntryMessage}`)
            rooms.splice(rooms.indexOf(currentRoom), 1)
        };
    };
});
