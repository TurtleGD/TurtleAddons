import { Immediate } from "../../barrl/Barrl"

export const WaypointColors = Object.freeze({
    RED: Object.freeze({
        INNER: new java.awt.Color(1, 0, 0, 0.2),
        OUTER: new java.awt.Color(1, 0, 0, 0.5)
    }),
    GREEN: Object.freeze({
        INNER: new java.awt.Color(0, 1, 0, 0.2),
        OUTER: new java.awt.Color(0, 1, 0, 0.5)
    }),
    BLUE: Object.freeze({
        INNER: new java.awt.Color(0, 0, 1, 0.2),
        OUTER: new java.awt.Color(0, 0, 1, 0.5)
    }),
    WHITE: Object.freeze({
        INNER: new java.awt.Color(1, 1, 1, 0.2),
        OUTER: new java.awt.Color(1, 1, 1, 0.5)
    })
})

/**
 * Renders a waypoint at given position - postRenderWorld
 * @param {number} x x
 * @param {number} y y
 * @param {number} z z
 * @param color Use WaypointColors.COLOR 
 * @param {boolean} phase Through walls
 * @param {String} text Text
 * @param {beaconBeam} beaconBeam Beacon
 */
export function renderWaypoint(x, y, z, color = WaypointColors.WHITE, phase = true) {
    Immediate.renderFilledBox(x, y, z, color.INNER, phase)
    Immediate.renderBox(x, y, z, color.OUTER, phase)
}

/**
 * Renders text at given position - postRenderWorld
 * @param {string} text Text
 * @param {number} x x
 * @param {number} y y
 * @param {number} z z
 * @param {number} scale Scale
 * @param {boolean} background Background
 * @param {boolean} phase Through walls
 */
export function renderString(text, x, y, z, scale, background, increase, phase = true) {
    Immediate.renderString(text, x, y, z, scale, background, increase, phase)
}