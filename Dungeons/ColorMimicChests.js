import settings from "../../settings";
import { TileEntityChest } from "../../utils/entities";
import { pogData } from "../../utils/pogData";

register("renderTileEntity", (entity) => {
    if (settings.colorMimicChests && pogData.skyblockArea.includes("Catacombs") && entity.tileEntity.func_145980_j() === 1) { // getChestType
        GL11.glPushMatrix();
        GL11.glColor3f(1.0, 0.0, 0.0);
    }
}).setFilteredClass(TileEntityChest)

register("postRenderTileEntity", (entity) => {
    if (settings.colorMimicChests && pogData.skyblockArea.includes("Catacombs") && entity.tileEntity.func_145980_j() === 1) {
        GL11.glPopMatrix();
        GL11.glColor3f(1.0, 1.0, 1.0);
    }
}).setFilteredClass(TileEntityChest)