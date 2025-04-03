import settings from "../../settings";

const instanceCommands = {
    't1': 'joininstance kuudra_normal',
    't2': 'joininstance kuudra_hot',
    't3': 'joininstance kuudra_burning',
    't4': 'joininstance kuudra_fiery',
    't5': 'joininstance kuudra_infernal',

    'f1': 'joininstance catacombs_floor_one',
    'f2': 'joininstance catacombs_floor_two',
    'f3': 'joininstance catacombs_floor_three',
    'f4': 'joininstance catacombs_floor_four',
    'f5': 'joininstance catacombs_floor_five',
    'f6': 'joininstance catacombs_floor_six',
    'f7': 'joininstance catacombs_floor_seven',

    'm1': 'joininstance master_catacombs_floor_one',
    'm2': 'joininstance master_catacombs_floor_two',
    'm3': 'joininstance master_catacombs_floor_three',
    'm4': 'joininstance master_catacombs_floor_four',
    'm5': 'joininstance master_catacombs_floor_five',
    'm6': 'joininstance master_catacombs_floor_six',
    'm7': 'joininstance master_catacombs_floor_seven',
}

Object.entries(instanceCommands).forEach(([commandName, command]) => {
    register('command', () => {
        ChatLib.command(command);
    }).setName(commandName, true);
})

register('chat', (player, command) => {
    if (settings.partyCommands) {
        if (instanceCommands[command]) ChatLib.command(instanceCommands[command])

        command = command.split(' ');
        switch (command[0]) {
            case 'warp':
                ChatLib.command('p warp');
                break;
            case 'allinv':
                ChatLib.command('p settings allinvite');
                break;
            case 'kickoffline':
                ChatLib.command('p kickoffline');
                break;
            case 'transfer':
            case 'pt':
                if (command.length > 1) ChatLib.command(`p transfer ${command[1]}`);
                else ChatLib.command(`p transfer ${player.split(' ').pop()}`);
                break;
            case 'ptme':
                ChatLib.command(`p transfer ${player.split(' ').pop()}`);
                break;
            case 'kick':
                if (command.length > 1) ChatLib.command(`p kick ${command[1]}`);
                break;
            case 'inv':
            case 'invite':
                if (command.length > 1) ChatLib.command(`p ${command[1]}`);
        }
    }
}).setCriteria(/Party > (.+): [.;!?](.+)/)