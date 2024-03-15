import settings from "../../settings";

const instanceCommands = {
    ';t1': 'joininstance kuudra_normal',
    ';t2': 'joininstance kuudra_hot',
    ';t3': 'joininstance kuudra_burning',
    ';t4': 'joininstance kuudra_fiery',
    ';t5': 'joininstance kuudra_infernal',

    ';f1': 'joininstance catacombs_floor_one',
    ';f2': 'joininstance catacombs_floor_two',
    ';f3': 'joininstance catacombs_floor_three',
    ';f4': 'joininstance catacombs_floor_four',
    ';f5': 'joininstance catacombs_floor_five',
    ';f6': 'joininstance catacombs_floor_six',
    ';f7': 'joininstance catacombs_floor_seven',

    ';m1': 'joininstance master_catacombs_floor_one',
    ';m2': 'joininstance master_catacombs_floor_two',
    ';m3': 'joininstance master_catacombs_floor_three',
    ';m4': 'joininstance master_catacombs_floor_four',
    ';m5': 'joininstance master_catacombs_floor_five',
    ';m6': 'joininstance master_catacombs_floor_six',
    ';m7': 'joininstance master_catacombs_floor_seven',

    ';torres': 'joininstance master_catacombs_floor_seven',
    ';prime': 'joininstance kuudra_burning',
    ';lovekuudra' : 'joininstance kuudra_infernal',
    ';jack' : 'joininstance kuudra_infernal'
};

register('chat', (message) => {
    if (settings.instanceCommands) {
        const regex = /Party\s*>\s*\[[^\]]+\]\s*(?:[^:]+:\s*)?(.+)/;
        const match = message.match(regex);

        if (match) {
            const command = instanceCommands[match[1]];
            if (command) ChatLib.command(command);
        };
    };
}).setCriteria("${message}");