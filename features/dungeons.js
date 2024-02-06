import settings from "../settings";
import { createWaypoint, EntityArmorStand } from "../exports";
import { getEntitySkullTexture } from "../../BloomCore/utils/Utils";

var witherKingMessageSent = false;
var witherKingMessageTime;

var holdingRelic;
var goldorPhase = 0;
var inMaxor = false;
var earlyP2MessageSent = false;

register('worldLoad', () => {
    witherKingMessageSent = false;
    holdingRelic = undefined;
    goldorPhase = 0;
    inMaxor = false;
    earlyP2MessageSent = false;
});

register("chat", (message) => {
    // Terminal number in chat
    if (message == ('[BOSS] Storm: I should have known that I stood no chance.')) {
        goldorPhase = 1;

        if (settings.sendTermInChat != 0 && settings.sendTermInChat != 5) ChatLib.command(`pc Doing ${parseInt(settings.sendTermInChat)}`);
        if (settings.sendTermInChat == 5) ChatLib.command('pc Device');
    };

    // Checks for next goldor phase for showing terminal text waypoint thing
    if ((message.includes('(7/7)') || message.includes('(8/8)')) && !message.includes(':')) goldorPhase += 1;
    if (goldorPhase == 5) goldorPhase = 0;

    // Starts rag timer
    if (settings.p5RagTimer) {
        if (message == ('[BOSS] Wither King: You.. again?')) {
            witherKingMessageTime = new Date().getTime();
            witherKingMessageSent = true;
            holdingRelic = undefined;
        };
    };

    // Checks if in maxor or not so entering p2 on time won't send message
    if (settings.entryMessage.length != 0 && message.includes("I'VE BEEN TOLD I COULD HAVE A BIT OF FUN WITH YOU")) inMaxor = true;
    if (settings.entryMessage.length != 0 && message.includes("I'M TOO YOUNG TO DIE AGAIN")) inMaxor = false; 

    // Create title on dragon death based on chat
    if (settings.dragSkipTitle) {
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
    }
}).setCriteria("${message}");

// Early P2 entry message
register('tick', () => {
    if (!earlyP2MessageSent && settings.entryMessage.length != 0 && Player.getY() < 205 && inMaxor) {
        ChatLib.command(`pc ${settings.entryMessage}`);
        earlyP2MessageSent = true
    }
});

// Rag axe timer, mostly from NwjnAddons reaper timer
register("renderOverlay", () => {
    if (witherKingMessageSent) {
      let timeLeft = new Date().getTime();
      timeLeft = 5 - (timeLeft - witherKingMessageTime) / 1000;
      if (timeLeft >= 0) Renderer.drawString(`Use Rag in: ${timeLeft.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 40, Renderer.screen.getHeight() / 2 + 6);
    };
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
