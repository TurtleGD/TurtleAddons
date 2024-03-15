import settings from "../../settings";

let goldorPhase = 0;

register('worldLoad', () => {
    goldorPhase = 0;
});

register("chat", (message) => {
    if (message == '[BOSS] Storm: I should have known that I stood no chance.') {
        goldorPhase = 1;
        if (settings.sendTermInChat != 0 && settings.sendTermInChat != 5) ChatLib.command(`pc Doing ${parseInt(settings.sendTermInChat)}`);
        if (settings.sendTermInChat == 5) ChatLib.command('pc Device');
    };

    if ((message.includes('(7/7)') || message.includes('(8/8)')) && !message.includes(':')) goldorPhase += 1;
    if (goldorPhase == 5) goldorPhase = 0;
}).setCriteria("${message}");

register('renderWorld', () => {
    if (settings.showTerm != 0) {
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
    };
});