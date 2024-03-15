import settings from "../../settings";

register("chat", (message) => {
    if (settings.dragSkipTitle) {
        switch (message) {
            case "[BOSS] Wither King: Your skills have faded humans.":
            case "[BOSS] Wither King: I am not impressed.":
            case "[BOSS] Wither King: Futile.":
            case "[BOSS] Wither King: You just made a terrible mistake!":
                Client.showTitle(' ', `NO SKIP`, 0, 20, 0);
                break;
            case "[BOSS] Wither King: Oh, this one hurts!":
            case "[BOSS] Wither King: My soul is disposable.":
            case "[BOSS] Wither King: I have more of those.":
                Client.showTitle(' ', `SKIPPED`, 0, 20, 0);
                break;
        };
    };
}).setCriteria("${message}");