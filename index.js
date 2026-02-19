import "./importer" // imports other files there instead of flooding here
import settings from "./config"
import { gui } from "./utils/Overlay"
import { logo } from "./utils/Utils"
import { Formatting } from "./utils/Formatting"

register("command", (...args) => {
    if (args[0] != null) {
        switch (args[0]) {
            case "gui":
                gui.open()
                break
            case "github":
                new TextComponent({
                    text: `${logo} ${Formatting.UNDERLINE}GitHub Link`,
                    clickEvent: {
                        action: "open_url",
                        value: "https://github.com/TurtleGD/TurtleAddons"
                    }
                }).chat()
                break
            case "help":
                ChatLib.chat(ChatLib.getCenteredText(`${Formatting.GRAY}[${Formatting.AQUA}TurtleAddons Help${Formatting.GRAY}]`))
                ChatLib.chat("");
                ChatLib.chat(`${Formatting.AQUA}/ta (/turtleaddons) ${Formatting.WHITE}- Open settings.`)
                ChatLib.chat(`${Formatting.AQUA}/ta gui ${Formatting.WHITE}- Opens the overlay editor.`)
                ChatLib.chat(`${Formatting.AQUA}/ta github ${Formatting.WHITE}- Sends a GitHub link in chat.`)
                break
        }
    } else {
        settings.openGUI()
    }
}).setName("ta").setAliases("turtleaddons")