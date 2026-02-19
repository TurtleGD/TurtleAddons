import { pogData } from "./PogData"

export class OverlayObject {
    static overlays = []

    /**
     * Creates a new overlay to be rendered, should be extended and implement #render(drawContext) and #isInHitbox(x, y)
     * @param {number} x x
     * @param {number} y y
     * @param {number} scale scale = 1
     * @param {string} name Name that will be shown in the overlay menu
     */
    constructor(x, y, scale, name) {
        this.x = x
        this.y = y
        this.scale = scale
        this.name = name

        OverlayObject.overlays.push(this)
    }
    
    /**
     * For each overlay to implement
     */
    render(drawContext) {}

    /**
     * For each overlay to implement for moving
     * @returns Is in hitbox
     */
    isInHitbox(x, y) {}

    /**
     * Draws the overlay - renderOverlay
     * @param {*} drawContext drawContext from renderOverlay param
     */
    static renderOverlays(drawContext) {
        this.overlays.forEach(overlay => {
            if (!overlay.enabled) return

            overlay.render(drawContext)
        })
    }
}

export const gui = new Gui()

let scrollText = new Text("Use scroll while holding click to change scale").setAlign(Text.Align.CENTER).setY(10).setShadow(true)
let settingsText = new Text("").setAlign(Text.Align.CENTER).setY(20).setShadow(true)
let xText = new Text("").setAlign(Text.Align.CENTER).setY(30).setShadow(true)
let yText = new Text("").setAlign(Text.Align.CENTER).setY(40).setShadow(true)
let scaleText = new Text("").setAlign(Text.Align.CENTER).setY(50).setShadow(true)
let instructions = [scrollText, settingsText, xText, yText, scaleText]

// i cant render a rectangle bro
let backgroundDim = new Text("              ", 0, 0).setBackground(true).setBackgroundColor(Renderer.getColor(0, 0, 0, 64))

register("renderOverlay", (drawContext) => {
    if (gui.isOpen()) {
        backgroundDim.setScale(Renderer.screen.getHeight() / 10).draw(drawContext)
        
        instructions.forEach(instruction => {
            instruction.setX(Renderer.screen.getWidth() / 2).draw(drawContext)
        })
    }

    OverlayObject.renderOverlays(drawContext)
})







let dragging = null // Overlay

// gui mouse drag is broken lol
let lastX = null
let lastY = null


// should be (dx, dy, x, y) but its actually not so dy and dy are x and y
// and then i have no fucking idea what x and y are
// Moves clicked overlay elements
register("guiMouseDrag", (x, y, notX, notY, button) => {
    if (!gui.isOpen()) return

    if (lastX == null) {
        lastX = x
        lastY = y
        return
    }

    let dx = x - lastX
    let dy = y - lastY

    lastX = x
    lastY = y

    if (dragging) {
        dragging.x += dx
        dragging.y += dy
        settingsText.setString("Setting: " + dragging.name)
        xText.setString("X: " + parseInt(dragging.x.toFixed(0)))
        yText.setString("Y: " + parseInt(dragging.y.toFixed(0)))
        scaleText.setString("Scale: " + dragging.scale)
    }
})

// Change scale
register("scrolled", (x, y, dir) => {
    if (gui.isOpen() && dragging != null) {
        dragging.scale += parseFloat((dir > 0 ? 0.05 : -0.05).toFixed(2)) // dir is +1 for up and -1 for down also this trigger runs twice??
        scaleText.setString("Scale: " + dragging.scale)
    }
})

// Picks which overlay to adjust
register("guiMouseClick", (x, y, button, state) => {
    // temporary until guiMouseDrag is fixed
    lastX = null
    lastY = null

    if (state && gui.isOpen()) {
        OverlayObject.overlays.forEach(overlay => {
            if (button == 0 && overlay.isInHitbox(x, y)) {
                dragging = overlay
                settingsText.setString("Setting: " + dragging.name)
                xText.setString("X: " + parseInt(dragging.x.toFixed(0)))
                yText.setString("Y: " + parseInt(dragging.y.toFixed(0)))
                scaleText.setString("Scale: " + dragging.scale)
                return
            }
        })
    }

    if (!state && gui.isOpen()) {
        dragging = null

        settingsText.setString("")
        xText.setString("")
        yText.setString("")
        scaleText.setString("")
    }
})

// Save data
register("guiClosed", () => {
    if (gui.isOpen()) OverlayObject.overlays.forEach(overlay => {
        pogData[overlay.name + " X"] = overlay.x
        pogData[overlay.name + " Y"] = overlay.y
        pogData[overlay.name + " Scale"] = overlay.scale
        pogData.save()
    })
})