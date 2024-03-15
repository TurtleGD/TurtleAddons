import settings from "../../settings";

let witherKingMessageSent = false;
let witherKingMessageTime;

register('worldLoad', () => {
    witherKingMessageSent = false;
});

register("chat", (message) => {
    if (settings.p5RagTimer) {
        if (message == '[BOSS] Wither King: You.. again?') {
            witherKingMessageTime = new Date().getTime();
            witherKingMessageSent = true;
        };
    };
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (witherKingMessageSent) {
        let timeLeftRag = new Date().getTime();
        timeLeftRag = 5 - (timeLeftRag - witherKingMessageTime) / 1000;
        if (timeLeftRag >= 0) Renderer.drawString(`Use Rag in: ${timeLeftRag.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 40, Renderer.screen.getHeight() / 2 + 6);
    };
});