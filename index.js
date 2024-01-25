import settings from './settings';
import "./features/kuudra";
import "./features/slayers";
import "./features/dungeons";
import "./features/discord";

register('command', () => {
    settings.openGUI();
}).setName('turtleaddons').setAliases('ta', 'turtle', '8joh', 'joh');
