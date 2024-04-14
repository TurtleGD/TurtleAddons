import settings from "../../settings";
import { GRAY } from "../../utils/formatting";

register("renderEntity", (entity, pos, partialTick, event) => {
    if (!isNaN(parseInt(entity.getName().replace(/,/g, '').slice(2))) && entity.getName().slice(0, 2) == GRAY && parseInt(entity.getName().replace(/,/g, '').slice(2)) < parseInt(settings.hideNonCrits)) {
        cancel(event);
    }
})
