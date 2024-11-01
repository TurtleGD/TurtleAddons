import settings from '../../settings';
import { getArea } from '../../utils/functions';
import { EntityArmorStand } from '../../utils/entities';

let inKuudra = false

register('worldLoad', () => {
    setTimeout(() => {
        inKuudra = getArea()?.includes("Kuudra's Hollow");
    }, 2000);
})

register('step', () => {
    if (settings.hideKuudraNametags && inKuudra) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            if (stand.getName().includes('❤')) stand.getEntity().func_70106_y();
        })
    }
}).setFps(5)