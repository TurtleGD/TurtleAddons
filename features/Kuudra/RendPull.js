import settings from '../../settings';
import { EntityMagmaCube } from '../../utils/entities';
import { GREEN, RESET } from '../../utils/formatting';
import { formatNumber, inTrueLair, getArea } from '../../utils/functions'

let kuudra = undefined;
let kuudraLastHP = 100_000;
let p4Start = undefined
let inInfernal = false;

let threshold = 25_000_000

register('worldLoad', () => {
    kuudra = undefined;
    kuudraLastHP = 100_000;
    p4Start = undefined
    
    setTimeout(() => inInfernal = getArea() == "Kuudra's Hollow (T5)", 2000);
})

register('tick', () => {
    if (!settings.rendPull || !inInfernal) return;

    kuudra = World.getAllEntitiesOfType(EntityMagmaCube).find((cube) => cube?.getWidth()?.toFixed(1) == 15.3 && cube?.getEntity()?.func_110143_aJ() <= 100_000);

    if (!kuudra) return;

    if (kuudra.getEntity()?.func_110143_aJ() > 25_000) return;
    
    if (kuudraLastHP > kuudra.getEntity()?.func_110143_aJ() && kuudraLastHP - kuudra.getEntity()?.func_110143_aJ() > threshold / 12_000 && kuudraLastHP - kuudra.getEntity()?.func_110143_aJ() < 26_000 && inTrueLair()) ChatLib.chat(`Someone pulled for ${GREEN}${formatNumber(((kuudraLastHP - kuudra.getEntity()?.func_110143_aJ()) * 12000).toFixed(0))} ${RESET}damage at ${GREEN}${((new Date().getTime() - p4Start) / 1000).toFixed(2)}s${RESET}.`)

    kuudraLastHP = kuudra.getEntity()?.func_110143_aJ();
})

register('chat', () => {
    p4Start = new Date().getTime();
}).setCriteria("[NPC] Elle: POW! SURELY THAT'S IT! I don't think he has any more in him!")