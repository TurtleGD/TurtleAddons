import settings from './settings';
import "./features/kuudra";
import "./features/slayers";
import "./features/dungeons";

register('command', () => {
    settings.openGUI();
}).setName('ta').setAliases('turtleaddons', 'turt', 'turtle', '8joh', 'joh');
