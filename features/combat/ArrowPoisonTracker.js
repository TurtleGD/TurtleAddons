import settings from "../../config"
import { Formatting } from "../../utils/Formatting"
import { OverlayObject } from "../../utils/Overlay"
import { pogData } from "../../utils/PogData"

let twilightIcon = new Item(new ItemType('minecraft:purple_dye'))
let toxicIcon = new Item(new ItemType('minecraft:lime_dye'))
let numTwilight = 0
let numToxic = 0
let twilightText = new Text("0x").setShadow(true)
let toxicText = new Text("0x").setShadow(true)

let overlay = new class extends OverlayObject {
    constructor() {
        super(pogData["Arrow Poison Tracker X"], pogData["Arrow Poison Tracker Y"], pogData["Arrow Poison Tracker Scale"], "Arrow Poison Tracker")
    }

    render(drawContext) {
        drawContext.drawItem(twilightIcon.mcValue, this.x, this.y)
        drawContext.drawItem(toxicIcon.mcValue, this.x, this.y + 10)

        twilightText.setX(this.x + 20).setY(this.y + 5).draw(drawContext)
        toxicText.setX(this.x + 20).setY(this.y + 15).draw(drawContext)
    }

    isInHitbox(x, y) {
        return x > this.x - 5 &&
                x < this.x + 40 &&
                y > this.y - 5 &&
                y < this.y + 30
    }
}

let registers = []

register("step", () => {
    if (settings.arrowPoisonTracker) {
        registers.forEach(r => r.register())
        overlay.enabled = true
    }
    else {
        registers.forEach(r => r.unregister())
        overlay.enabled = false
    }
}).setFps(2)

registers.push(register("step", () => {
    let inv = Player.getInventory()
    if (!inv) return
    
    numTwilight = 0
    numToxic = 0

    inv.getItems().forEach(item => {
        if (item) {
            if (item.getName().removeFormatting().includes("Twilight Arrow Poison")) numTwilight += item.getStackSize()
            else if (item.getName().removeFormatting().includes("Toxic Arrow Poison")) numToxic += item.getStackSize()
        }
    })

    twilightText.setString(`${numTwilight == 0 ? Formatting.RED : Formatting.GREEN}${numTwilight}x`)
    toxicText.setString(`${numToxic == 0 ? Formatting.RED : Formatting.GREEN}${numToxic}x`)
}).setFps(2).unregister())