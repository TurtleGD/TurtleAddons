import settings from "../../config"
import { Formatting } from "../../utils/Formatting"
import { logo } from "../../utils/Utils";

let textComponent;
let registers = []

register("step", () => {
    if (settings.architectsFirstDraft) registers.forEach(r => r.register())
    else registers.forEach(r => r.unregister())
}).setFps(1)

registers.push(register("chat", (message) => {
    if (!settings.architectsFirstDraft) return;

    if (message.startsWith("PUZZLE FAIL!") || message == "[STATUE] Oruo the Omniscient: Yikes") {
        textComponent = new TextComponent({
            text: `${logo} Click here to get an Architect's First Draft!`,
            clickEvent: {
                action: "run_command",
                value: "/_ta_gfs_draft"
            }
        })
        
        whyIsThisNeededBro.register()
    }
}).setCriteria("${message}").unregister())

registers.push(register("chat", () => {
    ChatLib.deleteChat("[TurtleAddons] Click here to get an Architect's First Draft!")
}).setCriteria("Moved 1 Architect's First Draft from your Sacks to your inventory.").unregister())


// scheduleTask doesn't work in chat registers??? ok man wtf
const whyIsThisNeededBro = register("tick", () => {
    Client.scheduleTask(0, () => {
        textComponent.chat()
    })
    whyIsThisNeededBro.unregister()
}).unregister()

// Ignores the prompt when normally clicking a chat message that runs a command
register("command", () => {
    ChatLib.command("gfs architect's first draft 1")
}).setName("_ta_gfs_draft")