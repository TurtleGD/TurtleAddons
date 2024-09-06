import settings from "../../settings";
import { RED, YELLOW, GREEN } from "../../utils/formatting";

let messages = [
    "[BOSS] Goldor: Who dares trespass into my domain?",
    "[BOSS] Goldor: What do you think you are doing there!",
    "Your ⚚ Bonzo's Mask saved your life!",
    "Your Bonzo's Mask saved your life!",
    "Your Phoenix Pet saved you from certain death!"
];
let inGoldor = false;
let text = new Text("").setScale(1.5).setShadow(true).setAlign("CENTER");
let ticks = 0;

register("chat", (message) => {
    if (settings.goldorTickTimer) {
        messages.forEach(m => {if (m == message) ticks = 0});

        if (message == "[BOSS] Storm: I should have known that I stood no chance.") inGoldor = true;
        else if (message == "The Core entrance is opening!") inGoldor = false;
    }
}).setCriteria("${message}");

register("packetReceived", () => {
    if (settings.goldorTickTimer && inGoldor) {
        ticks -= 1;
        if (ticks <= 0) ticks = 60;
        
        let color = ticks < 20 ? RED : ticks < 40 ? YELLOW : GREEN;
        text.setString(color + ticks);
    }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction"));

register("renderOverlay", () => {if (settings.goldorTickTimer && inGoldor) text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 + 10)});