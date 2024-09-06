import settings from "../../settings";

let widgets = settings.scoreboardWidgets.split(/\s*,\s*/);

let customScoreboard = [];
let width = 0;
let text = new Text('');

register('step', () => {
    if (settings.customScoreboard) {
        Scoreboard.setShouldRender(false);
        widgets = settings.scoreboardWidgets.split(/\s*,\s*/);
    }
    else Scoreboard.setShouldRender(true);
}).setDelay(1)

register('step', () => {
    if (settings.customScoreboard) {
        // Reset values
        width = 0;
        customScoreboard.length = 0;

        // SKYBLOCK CO-OP, etc
        let title = Scoreboard.getTitle();

        // Add default scoreboard to list
        customScoreboard = Scoreboard.getLines().slice().reverse().map(String);

        // Add widgets if applicable
        for (let i = 0; i < widgets.length; i++) {
            if (!World.isLoaded() || !TabList) return;
            const names = TabList?.getNames();
            if (!names) return;
            
            names.forEach((name, j) => {
                if (name.removeFormatting().startsWith(`${widgets[i]}:`)) {
                    customScoreboard.splice(customScoreboard.length - 1, 0, names[j]);
                    let counter = 1;
                    while (true) {
                        if (!names[j + counter] || names[j + counter].removeFormatting() === '' || !names[j + counter].removeFormatting().startsWith(' ')) break;
                        else {
                            customScoreboard.splice(customScoreboard.length - 1, 0, names[j + counter]);
                            counter += 1;
                        }
                    }
                    customScoreboard.splice(customScoreboard.length - 1, 0, '');
                }
            });
        }        

        // Adjusts scoreboard width
        width = Math.max(width, ...customScoreboard.map(line => Renderer.getStringWidth(line) + 10))

        // Center title
        while (Renderer.getStringWidth(title.removeFormatting()) < width - 15) title = ` ${title} `;
        customScoreboard.unshift(title);

        // Remove hypixel.net ip thing
        if (settings.hideHypixelIP) customScoreboard.splice(-2);

        // Merge list
        text.setString(customScoreboard.join('\n'));
    }
}).setFps(settings.customScoreboardUpdateRate)


register('renderOverlay', () => {
    if (settings.customScoreboard) {
        Renderer.drawRect((255 / (100 / settings.customScoreboardOpacity) << 24) | (0 << 16) | (0 << 8) | 0, Renderer.screen.getWidth() - width, (Renderer.screen.getHeight() / 2) - (text.getHeight() / 2), width, text.getHeight() + 2 + (settings.hideHypixelIP ? 3 : 0));
        text.draw(Renderer.screen.getWidth() - width + 2, (Renderer.screen.getHeight() / 2) - (text.getHeight() / 2) + 2);
    }
})