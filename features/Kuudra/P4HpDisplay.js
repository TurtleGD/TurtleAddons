import settings from "../../settings";
import { RED, GREEN, DARK_RED } from "../../utils/formatting";
import { EntityMagmaCube } from "../../utils/entities";
import { getArea, inTrueLair, isDead, formatNumber } from "../../utils/functions";

let HPDisplay = [];
let inInfernal = false;
let kuudra = undefined;

register('worldLoad', () => {
    HPDisplay = [];
    
    setTimeout(() => inInfernal = getArea() == "Kuudra's Hollow (T5)", 5000);
})

register('renderWorld', () => {
    if (HPDisplay[1] && !settings.deadHPDisplay || (settings.deadHPDisplay && dead)) Tessellator.drawString(HPDisplay[0], HPDisplay[1], HPDisplay[2] + 3, HPDisplay[3], Renderer.WHITE, true, 0.25, false);
})

register('tick', () => {
    kuudra = World.getAllEntitiesOfType(EntityMagmaCube).find((cube) => cube?.getWidth()?.toFixed(1) == 15.3 && cube?.getEntity()?.func_110143_aJ() <= 100_000);
    
    if (settings.trueHPDisplay && inInfernal && inTrueLair() && kuudra) {
        let kuudraHP = kuudra.getEntity().func_110143_aJ().toFixed(0);
                
        if (kuudraHP  == 1) HPDisplay = [`${DARK_RED}DEAD`, kuudra.getX(), kuudra.getY(), kuudra.getZ()];
        else HPDisplay = [`${GREEN + formatNumber(kuudraHP * 12000) + RED}❤`, kuudra.getX(), kuudra.getY(), kuudra.getZ()];
    }
})

register('step', () => {
    dead = isDead();
}).setDelay(1)