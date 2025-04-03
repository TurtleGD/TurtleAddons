import renderBeaconBeam from "../../BeaconBeam";
import RenderLib from "../../RenderLib";
import { pogData } from "./pogData";

/**
     * Creates a waypoint
     * @param {number} x - X Coordinates of the waypoint
     * @param {number} y - Y Coordinates of first position
     * @param {number} z - Z Coordinates of first position
     * @param {number} red - Box Color Red 0-1
     * @param {number} green - Box Color Green 0-1
     * @param {number} blue - Box Color Blue 0-1
     * @param {number} innerAlpha - Box sides alpha 0-1
     * @param {number} outerAlpha - Box edges alpha 0-1
     * @param {boolean} drawBeacon - Add a beacon beam, true/false
    */
export function createWaypoint(x, y, z, red, green, blue, innerAlpha, outerAlpha, drawBeacon) {
    RenderLib.drawInnerEspBox(x + 0.5, y, z + 0.5, 1, 1, red, green, blue, innerAlpha, true);
    RenderLib.drawEspBox(x + 0.5, y, z + 0.5, 1, 1, red, green, blue, outerAlpha, true);

    if (!drawBeacon) return;
    renderBeaconBeam(x, y + 1, z, 1, 1, 1, 0.1 * Player.asPlayerMP().distanceTo(x, y, z), false);
}

export function inTrueLair() {
    return (Player.getX() > -130 && Player.getX() < -75) &&
       (Player.getY() > 3 && Player.getY() < 30) &&
       (Player.getZ() > -130 && Player.getZ() < -75);
}

export function isDead() {
    return Player.getInventory()?.getItems()?.some(item => {
        return item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id') == 'HAUNT_ABILITY';
    });
}

export function removeEmojis(str) {
    return str.replace(/[^\x00-\x7F§]/g, "");
}

export function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// From VolcAddons
export function formatNumber(num) {
    if (isNaN(num) || num === 0) return "0";
    
    const sign = Math.sign(num);
    const absNum = Math.abs(num);

    if (absNum < 1) return (sign === -1 ? '-' : '') + absNum.toFixed(2);

    const abbrev = ["", "k", "m", "b", "t", "q", "Q"];
    const index = Math.floor(Math.log10(absNum) / 3);
  
    const formattedNumber = ((sign === -1 ? -1 : 1) * absNum / Math.pow(10, index * 3)).toFixed(2) + abbrev[index];

    if (Number.isInteger(absNum) && absNum < 1_000) return String(parseInt(formattedNumber));
    return formattedNumber;
};

export function getTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const timeString = [
        hours > 0 ? `${hours}h ` : '',
        `${minutes < 10 && hours > 0 ? '0' : ''}${minutes > 0 || hours > 0 ? minutes + 'm ' : ''}`,
        `${remainingSeconds < 10 && (hours > 0 || minutes > 0) ? '0' : ''}${remainingSeconds.toFixed(hours > 0 || minutes > 0 ? 0 : 0)}s`
    ].join('');
  
    return timeString;
}

// From BloomCore
function getArea() {
    let scoreboard = Scoreboard.getLines().map(a => a.getName()).map(a => ChatLib.removeFormatting(a));

    for (let i = 0; i < scoreboard.length; i++) {
        let match = scoreboard[i].match(/ ⏣ (.+)/);
        if (match) return match[1].toString().replace(/[^\u0000-\u007F]/g, "");
    }
    return null;
}


let areaFound = false;
let NetHandlerPlayClient;

register("worldLoad", () => {
    areaFound = false;
    pogData.skyblockArea = "";
    pogData.save();
    NetHandlerPlayClient = Client.getConnection();
})

register("step", () => {
    if (!TabList || areaFound) return;
    
    pogData.skyblockArea = getArea();
    if (pogData.skyblockArea && pogData.skyblockArea != "None") areaFound = true;
    else pogData.skyblockArea = ""; 
    pogData.save();
}).setFps(5)


// From nwjn
const MCTessellator = net.minecraft.client.renderer.Tessellator.func_178181_a()
const DefaultVertexFormats = net.minecraft.client.renderer.vertex.DefaultVertexFormats
const WorldRenderer = MCTessellator.func_178180_c()
/**
     * - Chattrigger's Tessellator.drawString() with depth check and multiline and shadow
     * - Renders floating lines of text in the 3D world at a specific position.
     *
     * @param {String} text The text to render
     * @param {Number} x X coordinate in the game world
     * @param {Number} y Y coordinate in the game world
     * @param {Number} z Z coordinate in the game world
     * @param {Number} color the color of the text
     * @param {Boolean} renderBlackBox
     * @param {Number} scale the scale of the text
     * @param {Boolean} increase whether to scale the text up as the player moves away
     * @param {Boolean} shadow whether to render shadow
     * @param {Boolean} depth whether to render through walls
     */
    export function drawStringV2(
        text,
        x,
        y,
        z,
        color = 0xffffff,
        renderBlackBox = true,
        scale = 1,
        increase = true,
        shadow = true,
        depth = true
    ) {
        ({ x, y, z } = Tessellator.getRenderPos(x, y, z))
        
        const lText = text.addColor()
        
        const lScale = increase 
            ? scale * 0.45 * (Math.sqrt(x**2 + y**2 + z**2) / 120) //increase up to 120 blocks away
            : scale
        const xMulti = Client.getMinecraft().field_71474_y.field_74320_O == 2 ? -1 : 1; //perspective
        
        GlStateManager.func_179131_c(1, 1, 1, 0.5) // color
        GlStateManager.func_179094_E() // pushmatrix

        GlStateManager.func_179137_b(x, y, z) // translate
        GlStateManager.func_179114_b(-Renderer.getRenderManager().field_78735_i, 0, 1, 0) // rotate
        GlStateManager.func_179114_b(Renderer.getRenderManager().field_78732_j * xMulti, 1, 0, 0) // rotate

        GlStateManager.func_179152_a(-lScale, -lScale, lScale) // scale
        GlStateManager.func_179140_f() //disableLighting
        GlStateManager.func_179132_a(false) //depthMask
            
        if (depth) GlStateManager.func_179097_i() // disableDepth

        GlStateManager.func_179147_l() // enableBlend
        GlStateManager.func_179112_b(770, 771) // blendFunc
            
        const lines = lText.split("\n")
        const l = lines.length
        const maxWidth = Math.max(...lines.map(it => Renderer.getStringWidth(it))) / 2

        if (renderBlackBox) {
            GlStateManager.func_179090_x() //disableTexture2D
            WorldRenderer.func_181668_a(7, DefaultVertexFormats.field_181706_f) // begin
            WorldRenderer.func_181662_b(-maxWidth - 1, -1 * l, 0).func_181666_a(0, 0, 0, 0.25).func_181675_d() // pos, color, endvertex
            WorldRenderer.func_181662_b(-maxWidth - 1, 9 * l, 0).func_181666_a(0, 0, 0, 0.25).func_181675_d() // pos, color, endvertex
            WorldRenderer.func_181662_b(maxWidth + 1, 9 * l, 0).func_181666_a(0, 0, 0, 0.25).func_181675_d() // pos, color, endvertex
            WorldRenderer.func_181662_b(maxWidth + 1, -1 * l, 0).func_181666_a(0, 0, 0, 0.25).func_181675_d() // pos, color, endvertex
            MCTessellator.func_78381_a() // draw
            GlStateManager.func_179098_w() // enableTexture2D
        }

        lines.forEach((it, idx) => {
            Renderer.getFontRenderer().func_175065_a(it, -Renderer.getStringWidth(it) / 2, idx * 9, color, shadow) // drawString
        })

        GlStateManager.func_179131_c(1, 1, 1, 1) // color
        GlStateManager.func_179132_a(true) // depthMask
        GlStateManager.func_179126_j() // enableDepth
        GlStateManager.func_179121_F() // popMatrix
    }



// Modified from RenderLibV2 (when will this find a use)

/**
     * Draws a line between 2 coordinates
     * @param {number} x - X Coordinates of first position
     * @param {number} y - Y Coordinates of first position
     * @param {number} z - Z Coordinates of first position
     * @param {number} red - Line Color Red 0-1
     * @param {number} green - Line Color Green 0-1
     * @param {number} blue - Line Color Blue 0-1
     * @param {number} alpha - Line Color Alpha 0-1
    */

export function drawLineFromCrosshair(x, y, z, red, green, blue, alpha) {
    GlStateManager.func_179094_E(); // pushMatrix
    GL11.glLineWidth(2);
    GL11.glDisable(GL11.GL_CULL_FACE); // disableCullFace
    GL11.glEnable(GL11.GL_BLEND); // enableBlend
    GL11.glBlendFunc(770, 771); // blendFunc
    GL11.glDisable(GL11.GL_TEXTURE_2D); // disableTexture2D
    GL11.glDepthMask(false); // depthMask
    GL11.glDisable(GL11.GL_DEPTH_TEST); // disableDepth

    Tessellator.begin(3).colorize(red, green, blue, alpha).pos(Player.getRenderX(), Player.getRenderY() + Player.asPlayerMP().getEyeHeight(), Player.getRenderZ()).pos(x, y, z).draw();

    GL11.glEnable(GL11.GL_CULL_FACE); // enableCull
    GL11.glDisable(GL11.GL_BLEND); // disableBlend
    GL11.glDepthMask(true); // depthMask
    GL11.glEnable(GL11.GL_TEXTURE_2D); // enableTexture2D
    GL11.glEnable(GL11.GL_DEPTH_TEST); // enableDepth

    GlStateManager.func_179121_F(); // popMatrix
}