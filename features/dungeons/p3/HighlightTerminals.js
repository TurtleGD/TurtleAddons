import { WaypointColors, renderWaypoint } from "../../../utils/RenderUtils"
import { MCClasses } from "../../../utils/MCClasses"
import settings from "../../../config"

let registers = []

register("chat", (message) => {
    if (message == "[BOSS] Storm: I should have known that I stood no chance.") registers.forEach(r => r.register())
    else if (message == "The Core entrance is opening!") registers.forEach(r => r.unregister())
}).setCriteria("${message}")

let activeTerminals = []
let inactiveTerminals = []

registers.push(register("step", () => {
    if (!settings.highlightTerminals) return

    activeTerminals = []
    inactiveTerminals = []

    World.getAllEntitiesOfType(MCClasses.ENTITY.ARMOR_STAND).forEach(stand => {
        let name = stand.getName()

        if (name.includes("Active") || (name.includes("Activated") && !name.includes("Not"))) {
            DeviceLocations.forEach(loc => {
                if (stand.distanceTo(loc[0], loc[1], loc[2]) < 10) {
                    activeTerminals.push(loc)
                    return
                }
            })

            TerminalLocations.forEach(loc => {
                if (stand.distanceTo(loc[0], loc[1], loc[2]) < 3) {
                    activeTerminals.push(loc)
                    return
                }
            })
        }

        if (name.includes("Inactive") || name.includes("Not Activated")) {
            DeviceLocations.forEach(loc => {
                if (stand.distanceTo(loc[0], loc[1], loc[2]) < 10) {
                    inactiveTerminals.push(loc)
                    return
                }
            })

            TerminalLocations.forEach(loc => {
                if (stand.distanceTo(loc[0], loc[1], loc[2]) < 3) {
                    inactiveTerminals.push(loc)
                    return
                }
            })
        }
    })
}).setFps(2).unregister())

registers.push(register("postRenderWorld", () => {
    if (!settings.highlightTerminals) return

    activeTerminals.forEach(term => {
        renderWaypoint(term[0], term[1], term[2], WaypointColors.GREEN, true)
    })

    inactiveTerminals.forEach(term => {
        renderWaypoint(term[0], term[1], term[2], WaypointColors.RED, true)
    })
}).unregister())



const TerminalLocations = [ //(and levers)
    // P1
    [111, 113, 73],
    [111, 119, 79],
    [89, 112, 92],
    [89, 122, 101],

    [94, 124, 113],
    [106, 124, 113],

    // P2
    [68, 109, 121],
    [59, 120, 122],
    [47, 109, 121],
    [40, 124, 122],
    [39, 108, 143],

    [27, 124, 127],
    [23, 132, 138],

    // P3
    [-3, 109, 112],
    [-3, 119, 93],
    [19, 123, 93],
    [-3, 109, 77],

    [2, 122, 55],
    [14, 122, 55],

    // P4
    [41, 109, 29],
    [44, 121, 29],
    [67, 109, 29],
    [72, 115, 48],

    [86, 128, 46],
    [84, 121, 34]
]

const DeviceLocations = [
    [107.5, 119, 93.5],
    [60, 131, 140],
    [0, 119, 77],
    [63, 126, 35]
]