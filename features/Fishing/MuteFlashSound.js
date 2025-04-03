import settings from "../../settings";

register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (settings.muteFlashSound && vol == 1 && pitch == 3 && Player.getHeldItem()?.getRawNBT()?.includes("Flash")) cancel(event)
}).setCriteria("mob.guardian.elder.idle")