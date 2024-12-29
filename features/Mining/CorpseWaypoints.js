import settings from "../../settings";
import { BOLD, BLUE, GOLD, AQUA, GRAY } from "../../utils/formatting";
import { EntityArmorStand } from "../../utils/entities";
import renderBeaconBeam from "../../../BeaconBeam";
import { pogData } from "../../utils/pogData";

let lapis = new Set();
let umber = new Set();
let tungsten = new Set();
let vanguard = new Set();

let lapisHelmet = "LAPIS_ARMOR_HELMET";
let umberHelmet = "ARMOR_OF_YOG_HELMET";
let tungstenHelmet = "MINERAL_HELMET";
let vanguardHelmet = "VANGUARD_HELMET";

register("worldUnload", () => {
    lapis.clear();
    umber.clear();
    tungsten.clear();
    vanguard.clear();
})

register("step", () => {
    if (settings.corpseWaypoint && pogData.skyblockArea.includes("Glacite Mineshafts")) {
        World.getAllEntitiesOfType(EntityArmorStand).forEach(stand => {
            const helmetNBT = new EntityLivingBase(stand.getEntity())?.getItemInSlot(4)?.getRawNBT();
            if (helmetNBT?.includes(lapisHelmet)) lapis.add(JSON.stringify([stand.getX(), stand.getY(), stand.getZ()]));
            else if (helmetNBT?.includes(umberHelmet)) umber.add(JSON.stringify([stand.getX(), stand.getY(), stand.getZ()]));
            else if (helmetNBT?.includes(tungstenHelmet)) tungsten.add(JSON.stringify([stand.getX(), stand.getY(), stand.getZ()]));
            else if (helmetNBT?.includes(vanguardHelmet)) vanguard.add(JSON.stringify([stand.getX(), stand.getY(), stand.getZ()]));
        })
    }
}).setDelay(1)

register("renderWorld", () => {
    if (settings.corpseWaypoint && pogData.skyblockArea.includes("Glacite Mineshafts")) {
        lapis.forEach(arrayJSON => {
            const array = JSON.parse(arrayJSON);
            Tessellator.drawString(`${BLUE + BOLD}Lapis`, array[0], array[1] + 2.5, array[2], Renderer.WHITE, true, 1.5, true);
            renderBeaconBeam(array[0] - 0.5, array[1] + 2.5, array[2] - 0.5, 85/255, 85/255, 1, 0.5, false);
        })
    
        umber.forEach(arrayJSON => {
            const array = JSON.parse(arrayJSON);
            Tessellator.drawString(`${GOLD + BOLD}Umber`, array[0], array[1] + 2.5, array[2], Renderer.WHITE, true, 1.5, true);
            renderBeaconBeam(array[0], array[1] + 2.5, array[2] - 0.5, 1, 170/255, 0, 0.5, false);
        })
    
        tungsten.forEach(arrayJSON => {
            const array = JSON.parse(arrayJSON);
            Tessellator.drawString(`${GRAY + BOLD}Tungsten`, array[0], array[1] + 2.5, array[2], Renderer.WHITE, true, 1.5, true);
            renderBeaconBeam(array[0] - 0.5, array[1] + 2.5, array[2] - 0.5, 170/255, 170/255, 170/255, 0.5, false);
        })
    
        vanguard.forEach(arrayJSON => {
            const array = JSON.parse(arrayJSON);
            Tessellator.drawString(`${AQUA + BOLD}Vanguard`, array[0], array[1] + 2.5, array[2], Renderer.WHITE, true, 1.5, true);
            renderBeaconBeam(array[0] - 0.5, array[1] + 2.5, array[2] - 0.5, 85/255, 1, 1, 0.5, false);
        })   
    }
})