import settings from "../../settings";
import { RED, GREEN, DARK_RED } from "../../utils/formatting";
import { EntityMagmaCube } from "../../utils/entities";
import { inTrueLair, isDead, formatNumber } from "../../utils/functions";
import { pogData } from "../../utils/pogData";

let HPDisplay = [];
let kuudra = undefined;

register("worldLoad", () => {
    HPDisplay = [];
})

register("renderWorld", () => {
    if (HPDisplay[1] && !settings.deadHPDisplay || (settings.deadHPDisplay && dead)) Tessellator.drawString(HPDisplay[0], HPDisplay[1], HPDisplay[2] + 3, HPDisplay[3], Renderer.WHITE, true, 0.25, false);
})

register("tick", () => {
    kuudra = World.getAllEntitiesOfType(EntityMagmaCube).find((cube) => cube?.getWidth()?.toFixed(1) == 15.3 && cube?.getEntity()?.func_110143_aJ() <= 100_000);
    
    if (settings.trueHPDisplay && pogData.skyblockArea.includes("(T5)") && inTrueLair() && kuudra) {
        let kuudraHP = kuudra.getEntity().func_110143_aJ().toFixed(0);
                
        if (kuudraHP  == 1) HPDisplay = [`${DARK_RED}DEAD`, kuudra.getX(), kuudra.getY(), kuudra.getZ()];
        else HPDisplay = [`${GREEN + formatNumber(kuudraHP * 12000) + RED}❤`, kuudra.getX(), kuudra.getY(), kuudra.getZ()];
    }
})

register("step", () => {
    dead = isDead();
}).setDelay(1)