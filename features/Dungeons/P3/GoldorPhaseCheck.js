import { pogData } from "../../../utils/pogData";

register("worldLoad", () => {
    pogData.goldorPhase = 0;
    pogData.inGoldorPhase = 0;
    pogData.save();
});

register("chat", (message) => {
    if (message == "[BOSS] Storm: I should have known that I stood no chance.") {
        pogData.goldorPhase = 1;
        pogData.save();
    } else if ((message.includes("(7/7)") || message.includes("(8/8)")) && !message.includes(":")) {
        pogData.goldorPhase += 1;
        pogData.save();
    } else if (message == "The Core entrance is opening!") {
        pogData.goldorPhase = 5;
        pogData.save();
    } else if (message == "[BOSS] Necron: You went further than any human before, congratulations.") {
        pogData.goldorPhase == 0;
        pogData.save();
    }
}).setCriteria("${message}");

register("step", () => {
    if (pogData.goldorPhase > 0) {
        if ((Player.getX() > 90 && Player.getX() < 110) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 52 && Player.getZ() < 123)) pogData.inGoldorPhase = 1;
        else if ((Player.getX() > 17 && Player.getX() < 105) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 125 && Player.getZ() < 142)) pogData.inGoldorPhase = 2;
        else if ((Player.getX() > -2 && Player.getX() < 15) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 49   && Player.getZ() < 137)) pogData.inGoldorPhase = 3;
        else if ((Player.getX() > -2 && Player.getX() < 88) && (Player.getY() > 107 && Player.getY() < 145) && (Player.getZ() > 30 && Player.getZ() < 54)) pogData.inGoldorPhase = 4;
        else if ((Player.getX() > 41 && Player.getX() < 68) && (Player.getY() > 110 && Player.getY() < 150) && (Player.getZ() > 59 && Player.getZ() < 117)) pogData.inGoldorPhase = 5;
        else pogData.inGoldorPhase = 0;
        pogData.save();
    }
}).setFps(5);