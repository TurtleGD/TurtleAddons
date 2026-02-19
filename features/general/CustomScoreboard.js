import settings from "../../config"

let widgets = settings.customScoreboard.split(/\s*,\s*/)

let customScoreboard = []
let width = 0
let text = new Text("")

register("step", () => {
    if (settings.customScoreboard) {
        Scoreboard.setShouldRender(false)
        widgets = settings.customScoreboard.split(/\s*,\s*/)
    } else Scoreboard.setShouldRender(true)
}).setDelay(1)

register("step", () => {
    if (settings.customScoreboard) {
        // Reset values
        width = 0
        customScoreboard = []

        // SKYBLOCK CO-OP, etc
        let title = Scoreboard.getTitle().toString()

        // Add default scoreboard to list
        Scoreboard.getLines().forEach(line => customScoreboard.push(line.toString()))

        // Remove www.hypixel.net
        customScoreboard.splice(-2)

        // Add widgets if applicable
        if (!World.isLoaded() || !TabList) return
        let names = TabList?.getNames()
        if (!names) return

        customScoreboard.push("")

        for (let i = 0; i < names.size(); i++) {
            for (let j = 0; j < widgets.length; j++) {
                if (ChatLib.removeFormatting(names.get(i).toString()).startsWith(`${widgets[j]}:`)) {
                    customScoreboard.push(names.get(i).toString())
                    let counter = 1
                    while (true) {
                        if (ChatLib.removeFormatting(names.get(counter + i).toString()).replace(/\s/g, "") == "") break
                        else {
                            customScoreboard.push(names.get(i + counter).toString())
                            counter += 1
                        }
                    }
                    customScoreboard.push("")
                }
            }
        }
        
        // Adjusts scoreboard width
        width = Math.max(width, ...customScoreboard.map(line => Renderer.getStringWidth(line) + 10))

        // Center title
        while (Renderer.getStringWidth(ChatLib.removeFormatting(title)) < width - 15) title = ` ${title} `
        customScoreboard.unshift(title)

        // Merge list
        text.setString(customScoreboard.join("\n"))
    }
}).setFps(2)


register("renderOverlay", (drawContext) => {
    if (settings.customScoreboard) {
        // Renderer.drawRect((255 / (100 / settings.customScoreboardOpacity) << 24) | (0 << 16) | (0 << 8) | 0, Renderer.screen.getWidth() - width, (Renderer.screen.getHeight() / 2) - (text.getHeight() / 2), width, text.getHeight() + 2 + (settings.hideHypixelIP ? 3 : 0))
        text.setX(Renderer.screen.getWidth() - width + 2).setY((Renderer.screen.getHeight() / 2) - (text.getHeight() / 2) + 2).draw(drawContext)
    }
})