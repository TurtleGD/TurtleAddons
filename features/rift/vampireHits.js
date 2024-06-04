import settings from "../../settings";
import { EntityArmorStand } from "../../utils/entities";

let bosses = [];
let riftDamage = undefined;
let playerEntity = undefined;

register('worldLoad', () => {setTimeout(() => playerEntity = new EntityLivingBase(Player?.asPlayerMP()?.getEntity()), 500)});

register('step', () => {
    if (!settings.vampireHits) return;

    riftDamage = 0;
    bosses.length = 0;

    const heldItemID = Player.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString('id');

    TabList.getNames().forEach(line => {
        line = line.removeFormatting()
        if (line.includes('Rift Damage')) {
            riftDamage += parseInt(line.replace(/\D/g, ''));
            if (heldItemID == 'SILVER_LACED_KARAMBIT') riftDamage += 8;
            else if (heldItemID == 'SILVERTWIST_KARAMBIT') riftDamage += 11;
        }
    })

    World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
        if (playerEntity?.canSeeEntity(stand) === false) return;
        const bossHP = stand.getName().removeFormatting().slice(2).replace('❤', '').replace(',', '');
        if (bossHP.includes('Bloodfiend')) bosses.push([bossHP, stand.getX(), stand.getY(), stand.getZ()]);
    })
}).setFps(5)

register('renderWorld', () => {
    if (!settings.vampireHits) return;

    bosses.forEach(boss => {
        const tier = boss[0].split(' ')[1];
        const hp = parseInt(boss[0].split(' ')[2]);
        let hits = undefined;

        switch (tier) {
            case 'I':
                hits = 'do a higher tier silly goose';
                break;
            case 'II':
                hits = 'do a higher tier silly goose';
                break;
            case 'III':
                hits = 'do a higher tier silly goose';
                break;
            case 'IV':
                if (hp <= 480) hits = 'Stake!';
                else if (hp > 480 && hp < 1100) hits = `${Math.ceil((hp - 479) / riftDamage)} hits`;
                else if (hp >= 1100 && hp < 1800) hits = `${Math.ceil((hp - 1099) / riftDamage)} hits`;
                else if (hp >= 1800 && hp < 2400) hits = `${Math.ceil((hp - 1799) / riftDamage)} hits`;
                else hits = '';
                break;
            case 'V':
                if (hp <= 600) hits = 'Stake!';
                else if (hp > 600 && hp < 1200) hits = `${Math.ceil((hp - 599) / riftDamage)} hits`;
                else if (hp >= 1200 && hp < 1800) hits = `${Math.ceil((hp - 1199) / riftDamage)} hits`;
                else if (hp >= 1800 && hp < 2400) hits = `${Math.ceil((hp - 1799) / riftDamage)} hits`;
                else if (hp >= 2400) hits = `${Math.ceil((hp - 2399) / riftDamage)} hits`;
                else hits = '';
                break;
        }

        Tessellator.drawString(hits, boss[1], boss[2] + 0.2, boss[3], Renderer.WHITE, true, 0.025, false)
    })
})
