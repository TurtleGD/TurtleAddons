import settings from "../../settings";

register('chat', (message) => {
    if (settings.leaderCommands) {
        const messageRegex = /Party > [^:]+: (.+)/;
        const messageMatch = message.match(messageRegex);

        const playerRegex = /^Party > (?:\[.*?\]\s*)?(\w+):([^]+)/;
        const playerMatch = message.match(playerRegex);

        if (messageMatch) {
            switch (true) {
                case messageMatch[1] == (';warp'):
                    ChatLib.command('p warp');
                    break;
                case messageMatch[1] == (';allinv'):
                    ChatLib.command('p settings allinvite');
                    break;
                case messageMatch[1] == (';transfer'):
                    if (playerMatch) ChatLib.command(`p transfer ${playerMatch[1]}`);
                    break;
                case messageMatch[1].startsWith(';kick'):
                    ChatLib.command(`p kick ${messageMatch[1].substring(messageMatch[1].indexOf(' ') + 1)}`);
                    break;
            };
        };
    };
}).setCriteria("${message}");
