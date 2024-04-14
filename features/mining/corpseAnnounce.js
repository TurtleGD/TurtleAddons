import settings from "../../settings";

let corpses = [];

register('worldLoad', () => {
    if (settings.corpseAnnounce) {
        corpses.splice(0, corpses.length);
        setTimeout(() => {
            for (let i = 0; i < TabList?.getNames().length; i++) {
                if (TabList?.getNames()[i]?.removeFormatting()?.includes('Frozen Corpses:')) {
                    let counter = 1;
                    while (counter > 0) {
                        if (TabList?.getNames()[i + counter]?.removeFormatting() == '') {
                            ChatLib.command(`pc Avaliable Corpses: ${corpses.join(', ')}`);
                            corpses.splice(0, corpses.length);
                            return;
                        } else {
                            corpses.push(TabList?.getNames()[i + counter]?.removeFormatting().replace(':', '').split(' ')[1]);
                            counter += 1;
                        }
                    }
                }
            }
        }, 2000)
    }
})