import settings from './settings';
import "./features/kuudra";
import "./features/slayers";
import "./features/dungeons";
import "./features/discord";

register('command', () => {
    settings.openGUI();
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');

// Testing
register('command', () => {
    ChatLib.chat(Player.getHeldItem()?.getNBT())
}).setName('getnbt')
