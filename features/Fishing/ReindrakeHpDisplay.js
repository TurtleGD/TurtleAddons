import settings from "../../settings";
import { EntityEnderDragon } from "../../utils/entities";
import { pogData } from "../../utils/pogData";

register("renderWorld", () => {
    if (!settings.reindrakeHP || !pogData.skyblockArea.includes("Workshop")) return;
    World.getAllEntitiesOfType(EntityEnderDragon).forEach(dragon => {
        Tessellator.drawString(`§a${dragon.getEntity().func_110143_aJ().toFixed(0)}§c❤`, dragon.getRenderX(), dragon.getRenderY() + 0.5, dragon.getRenderZ(), Renderer.WHITE, true, 0.25, false);
    })
})