import settings from "../../settings";
import { GRAY } from "../../utils/formatting";
import { EntityArmorStand } from "../../utils/entities"

register("renderEntity", (entity, pos, partialTick, event) => {
    if (entity.getName().slice(0, 2) == GRAY && parseInt(entity.getName().removeFormatting().replace(/,/g, '').slice(2)) < parseInt(settings.hideNonCrits)) {
        cancel(event);
    }
}).setFilteredClass(EntityArmorStand)
