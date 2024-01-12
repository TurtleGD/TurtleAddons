import {
    @Vigilant,
    @SwitchProperty,
    @SelectorProperty,
    @CheckboxProperty
} from '../Vigilance/index';
import { BOLD, AQUA } from "./exports";

@Vigilant('TurtleAddons', `${AQUA + BOLD}TurtleAddons`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Kuudra', 'Slayers', 'Dungeons'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class settings {
    constructor() {
        this.initialize(this);

        this.addDependency("Highlight Stun Block", "Nether Brick Stun Helper");
        this.addDependency("Highlight Etherwarp Block", "Nether Brick Stun Helper");
    }

    // Kuudra
    @SwitchProperty({
        name: 'Nether Brick Stun Helper',
        description: `Highlights the blocks used for nether brick stunning.\n(Requires at least 1500 mining speed).`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    stunHelper = false;

    @CheckboxProperty({
        name: 'Highlight Stun Block',
        description: `Highlights the nether brick block to break.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    stunBlock = false;

    @CheckboxProperty({
        name: 'Highlight Etherwarp Block',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    etherwarpBlock = false;

    // Slayers
    @SwitchProperty({
        name: 'Send Rare Drops',
        description: 'Sends rare slayer drops in party chat.',
        category: 'Slayers',
        subcategory: 'Boss Drops',
    })
    sendSlayerDrops = false;

    @SwitchProperty({
        name: 'Rare Drop Title',
        description: 'Creates a title for rare slayer drops.',
        category: 'Slayers',
        subcategory: 'Boss Drops',
    })
    slayerDropTitle = false;

    // Dungeons
    @SwitchProperty({
        name: 'P5 Ragnarock Axe Timer',
        description: 'Tells you when to rag axe during the dragons phase.\nActivates rag axe 5s before dragons spawn.',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    p5RagTimer = false;

    @SwitchProperty({
        name: 'Relic Waypoint',
        description: 'Creates a waypoint to place the correct corrupted relic.\n(Why would you need this)',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    relicHelper = false;

    @SwitchProperty({
        name: 'Dragon Skip Notification',
        description: 'Creates a subtitle on dragon death (hopefully).',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    dragSkipTitle = false;

    @SelectorProperty({
        name: 'Show Terminal Number',
        description: 'Displays your terminal number on the terminal (and device).',
        category: 'Dungeons',
        subcategory: 'Terminals',
        options: ['None', '1', '2', '3', '4', 'Device', 'All'],
    })
    showTerm = 0;

    @SelectorProperty({
        name: 'Callout Terminal',
        description: 'Sends your terminal number in party chat (and device).',
        category: 'Dungeons',
        subcategory: 'Terminals',
        options: ['None', '1', '2', '3', '4', 'Device'],
    })
    sendTermInChat = 0;
}

export default new settings();
