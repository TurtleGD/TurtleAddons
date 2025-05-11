import axios from "../../../axios";
import { AQUA, GOLD, GRAY, STRIKETHROUGH } from "../../utils/formatting";
import settings from "../../settings";

let playerStats = {};

register("worldLoad", () => {
    playerStats = {};
})

register("chat", () => {
    let players = World.getAllPlayers().filter(player => player.getUUID().version() == 4);

    players.forEach(player => {
        getSecrets(player.getUUID()).then(secrets => {
            playerStats[player.getName()] = {
                username: player.getName(),
                uuid: player.getUUID(),
                secrets: secrets,
                deaths: 0
            }
        })
    })
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("chat", (info) => {
    let player = ChatLib.removeFormatting(info).split(" ")[0];
    Object.entries(playerStats).forEach(([username, data]) => {
        if (username == player || (username == Player.getName() && player.toLowerCase() == 'you')) data.deaths++;
    })
}).setCriteria("&r&c ☠ ${info} became a ghost&r&7.&r");

register("chat", () => {
    if (!settings.secretTracker) return;
    
    Object.entries(playerStats).forEach(([username, data]) => {
        getSecrets(data.uuid).then(newSecrets => {
            data.secrets = Math.max(newSecrets - data.secrets, 0);
        })
    })

    Client.scheduleTask(100, () => {
        ChatLib.chat(ChatLib.getChatBreak(`${GRAY + STRIKETHROUGH}-`));
        Object.entries(playerStats).forEach(([username, data]) => {
            ChatLib.chat(`${GRAY}[${AQUA}TA${GRAY}] ${AQUA + username + GRAY} - ${GOLD + data.secrets + GRAY} secrets | ${GOLD + data.deaths + GRAY} deaths`);
        })
        ChatLib.chat(ChatLib.getChatBreak(`${GRAY + STRIKETHROUGH}-`));
    })
}).setCriteria(/^\s*☠ Defeated (.+) in 0?([\dhms ]+?)\s*(\(NEW RECORD!\))?$/)

function getSecrets(uuid) {
    return axios.get(`https://api.tenios.dev/secrets/${uuid}`).then(response => parseInt(response.data)).catch(error => {
        console.log(error);
        return 0;
    })
}