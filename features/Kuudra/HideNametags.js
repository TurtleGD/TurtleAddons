import settings from "../../settings";
import { pogData } from "../../utils/pogData";
import { EntityArmorStand } from "../../utils/entities";

register("step", () => {
    if (settings.hideKuudraNametags && pogData.skyblockArea.includes("Kuudra")) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            if (stand.getName().includes("❤")) stand.getEntity().func_70106_y();
        })
    }
}).setFps(5)