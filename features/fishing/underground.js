// Taken and edited from RenderLib
function drawEspBoxTop (x, y, z, red, green, blue, alpha, phase) {
    Tessellator.pushMatrix();
    GL11.glLineWidth(2.0);
    GlStateManager.func_179129_p(); // disableCullFace
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179112_b(770, 771); // blendFunc
    GlStateManager.func_179132_a(false); // depthMask
    GlStateManager.func_179090_x(); // disableTexture2D

    if (phase) {
        GlStateManager.func_179097_i(); // disableDepth
    }   

    Tessellator.begin(GL11.GL_QUADS, false);
    Tessellator.colorize(red, green, blue, alpha);

    // Top side vertices
    Tessellator.translate(x, y, z)
        .pos(0.5, 1, 0.5)
        .pos(0.5, 1, -0.5)
        .pos(-0.5, 1, -0.5)
        .pos(-0.5, 1, 0.5)
        .draw();

    GlStateManager.func_179089_o(); // enableCull
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179132_a(true); // depthMask
    GlStateManager.func_179098_w(); // enableTexture2D
    
    if (phase) {
        GlStateManager.func_179126_j(); // enableDepth
    }
            
    Tessellator.popMatrix();
};
    

const set = new Set();

register('worldLoad', () => {
    set.clear();
})

register('command', () => {
    set.clear();
}).setName('clearunderground')

register('renderWorld', () => {
    set.forEach(arrayJSON => {
        const array = JSON.parse(arrayJSON)
        drawEspBoxTop(array[0] + 0.5, array[1], array[2] + 0.5, 1, 0, 0, 0.5, false);
    });
})

// Figure out how to optimize this
register('command', (arg) => {
    if (!isNaN(parseInt(arg))) {
        for (let offsetX = -1 * parseInt(arg); offsetX <= parseInt(arg); offsetX++) {
            for (let offsetY = -5; offsetY <= 5; offsetY++) {
                for (let offsetZ = -1 * parseInt(arg); offsetZ <= parseInt(arg); offsetZ++) {
                    let x = Math.floor(Player.getX()) + offsetX;
                    let y = Math.floor(Player.getY()) + offsetY;
                    let z = Math.floor(Player.getZ()) + offsetZ;
                    
                    let name = World.getBlockAt(x, y, z).type.name
                    if (name == 'Lava') {
                        for (let offset = 1; offset < 255 - y; offset++) {
                            if (World.getBlockAt(x, y + offset, z).type.name != 'tile.air.name' && World.getBlockAt(x, y + offset, z).type.name != 'Lava' && World.getBlockAt(x, y + 1, z).type.name != "Lava") set.add(JSON.stringify([x, y, z]));
                        }
                    }
                    if (name == 'Water') {
                        for (let offset = 1; offset < 255 - y; offset++) {
                            if (World.getBlockAt(x, y + offset, z).type.name != 'tile.air.name' && World.getBlockAt(x, y + offset, z).type.name != 'Water' && World.getBlockAt(x, y + 1, z).type.name != "Water") set.add(JSON.stringify([x, y, z]));
                        }
                    }
                }
            }
        }
    }
}).setName('checkunderground')
