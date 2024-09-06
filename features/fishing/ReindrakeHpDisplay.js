import settings from '../../settings.js';
import { EntityEnderDragon } from '../../utils/entities.js';

let jerry = false

register('worldLoad', () => {
    setTimeout(() => jerry = TabList.getNames().join('').includes('Workshop'), 2000)
})

register('renderWorld', () => {
    if (!settings.reindrakeHP || !jerry) return;
    World.getAllEntitiesOfType(EntityEnderDragon).forEach(dragon => {
        Tessellator.drawString(`§a${dragon.getEntity().func_110143_aJ().toFixed(0)}§c❤`, dragon.getX(), dragon.getY() + 0.5, dragon.getZ(), Renderer.WHITE, true, 0.25, false);
    })
})