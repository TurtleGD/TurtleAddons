import settings from "../../config"
import { pogData } from "../../utils/PogData"
import { renderWaypoint, WaypointColors, renderString } from "../../utils/RenderUtils"

let exit = []
let inMineshaft = false

let render = register("postRenderWorld", () => {
    if (exit[0]) {
        renderString(`Exit`, exit[0], exit[1] + 0.75, exit[2], 3, true, false)
        renderWaypoint(exit[0] - 0.5, exit[1] - 1, exit[2] - 0.5, WaypointColors.WHITE)
    }
}).unregister()

register("worldLoad", () => {
    Client.scheduleTask(20, () => {
        exit = [Player.getX(), Player.getY(), Player.getZ()]
    })
    

    Client.scheduleTask(40, () => {
        if (pogData.skyblockArea.includes("Glacite Mineshafts")) inMineshaft = true
    })
})

register("step", () => {
    if (inMineshaft && settings.mineshaftExitWaypoint) render.register()
    else render.unregister()
}).setFps(2)

register("worldUnload", () => {
    exit = []
    inMineshaft = false
    render.unregister()
})

