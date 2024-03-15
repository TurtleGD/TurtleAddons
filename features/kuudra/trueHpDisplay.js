import settings from "../../settings";
import { RED, GREEN, DARK_RED} from "../../exports";
import { getArea, inTrueLair, isDead, EntityMagmaCube, formatNumber} from "../../exports";
import VolcAddons from "../../../VolcAddons/utils/settings";

let HPDisplay = [];
let inInfernal = false;

register('worldLoad', () => {
    HPDisplay = [];
    inInfernal = false;

    setTimeout(() => {
        if (getArea() == "Kuudra's Hollow (T5)") inInfernal = true;
    }, 2000); 
});

register('renderWorld', () => {
    if (HPDisplay[1]) {
        if (!settings.deadHPDisplay || (settings.deadHPDisplay && dead)) Tessellator.drawString(HPDisplay[0], HPDisplay[1], HPDisplay[2] + 3, HPDisplay[3], Renderer.WHITE, true, 0.25, false);
    } ;
});

register('tick', () => {
    if (settings.trueHPDisplay && inInfernal && inTrueLair()) {
        World.getAllEntitiesOfType(EntityMagmaCube).forEach(cube => {
            if (cube.getWidth().toFixed(1) == 15.3 && cube.getEntity().func_110143_aJ() <= 25001) {
                kuudraHP = cube.getEntity().func_110143_aJ().toFixed(0);
                
                if (kuudraHP  == 1) HPDisplay = [`${DARK_RED}DEAD`, cube.getX(), cube.getY(), cube.getZ()];
                else HPDisplay = [`${GREEN + formatNumber(kuudraHP * 12000) + RED}❤`, cube.getX(), cube.getY(), cube.getZ()];
            };
        });
    };

    if (settings.hideVolcHP && VolcAddons) {
        if (inTrueLair() && inInfernal) VolcAddons.kuudraHP = false
        else VolcAddons.kuudraHP = true
    };
});

register('step', () => {
    dead = isDead();
}).setDelay(1)