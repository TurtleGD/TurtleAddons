import settings from "../../settings";

let bonzoTime;
let bonzoInvinicibility = false;
let spiritTime;
let spiritInvinicibility = false;
let phoenixTime;
let phoenixInvinicibility = false;

register('worldLoad', () => {
    bonzoInvinicibility = false;
    spiritInvinicibility = false;
    phoenixInvinicibility = false;
});


register("chat", (message) => {
    if (settings.bonzoInvinicibility) {
        if (message == "Your Bonzo's Mask saved your life!" || message == "Your ⚚ Bonzo's Mask saved your life!") {
            bonzoTime = new Date().getTime();
            bonzoInvinicibility = true
            spiritInvinicibility = false
            phoenixInvinicibility = false
        };
    };

    if (settings.spiritInvinicibility) {
        if (message == "Second Wind Activated! Your Spirit Mask saved your life!") {
            spiritTime = new Date().getTime();
            bonzoInvinicibility = false
            spiritInvinicibility = true
            phoenixInvinicibility = false
        };
    };

    if (settings.phoenixInvinicibility) {
        if (message == 'Your Phoenix Pet saved you from certain death!') {
            phoenixTime = new Date().getTime();
            bonzoInvinicibility = false
            spiritInvinicibility = false
            phoenixInvinicibility = true
        };
    };
}).setCriteria("${message}");

register("renderOverlay", () => {
    if (bonzoInvinicibility) {
        let timeLeftBonzo = new Date().getTime();
        timeLeftBonzo = 3 - (timeLeftBonzo - bonzoTime) / 1000;
        if (timeLeftBonzo >= 0) Renderer.drawString(`${timeLeftBonzo.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 6);
        if (timeLeftBonzo < 0) {
            bonzoInvinicibility = false;
        };
    };

    if (spiritInvinicibility) {
        let timeLeftSpirit = new Date().getTime();
        timeLeftSpirit = 3 - (timeLeftSpirit - spiritTime) / 1000;
        if (timeLeftSpirit >= 0) Renderer.drawString(`${timeLeftSpirit.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 6);
        if (timeLeftSpirit < 0) {
            spiritInvinicibility = false;
        };
    };

    if (phoenixInvinicibility) {
        let timeLeftPhoenix = new Date().getTime();
        timeLeftPhoenix = (2 + (settings.phoenixLevel * 0.02)) - (timeLeftPhoenix - phoenixTime) / 1000;
        if (timeLeftPhoenix >= 0) Renderer.drawString(`${timeLeftPhoenix.toFixed(3)}`, Renderer.screen.getWidth() / 2 - 12, Renderer.screen.getHeight() / 2 + 6);
        if (timeLeftPhoenix < 0) {
            phoenixInvinicibility = false;
        };
    };
});