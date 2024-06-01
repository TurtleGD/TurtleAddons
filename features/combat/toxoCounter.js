import settings from "../../settings";
import { GOLD, RESET } from "../../utils/formatting";
import { addCommas } from "../../utils/functions";

const xpThresholds = [50_000, 100_000, 250_000, 500_000, 1_000_000, 1_500_000, 2_000_000, 2_500_000, 3_000_000];

register("step", () => {
    if (settings.toxoCounter) {
        if (!Player?.getContainer()) return;

        Player.getContainer().getItems().forEach(item => {
            if (item?.getNBT()?.getString('id') != 'minecraft:bow') return;
            let toxoXP = (item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getDouble("toxophilite_combat_xp"))?.toFixed(0);
            if (toxoXP == 0) return;

            // getLore() returns an immutable list or smth idfk
            let lore = [];
            item.getLore().forEach(line => lore.push(line));
            lore.shift();
            lore = lore.filter(line => !line.includes('Toxophilite: '));
            lore = lore.filter(line => !line.includes('RARITY UPGRADED')); // Some mod adds this idk which

            let bowIndex = lore.findIndex(line => line.includes('BOW'))
            lore.splice(bowIndex + 1);

            let counter = ''
            if (toxoXP <= 3_000_000) counter = `${RESET}Toxophilite: ${GOLD + addCommas(toxoXP)}/${addCommas(xpThresholds.find(threshold => threshold > toxoXP))}`;
            else counter = `${RESET}Toxophilite: ${GOLD + addCommas(toxoXP)}`;

            for (let i = bowIndex; i >= 0; i--) {
                if (lore[i].removeFormatting() == '') {
                    lore.splice(i, 0, counter);
                    if (lore[i - 1].removeFormatting() != '' && !lore[i - 1].includes('Kills:')) lore.splice(i, 0, '') // Adds a space before the line unless book of stats is there
                    item.setLore(lore);
                    break;
                }
            } 
        })
    }
}).setFps(5)