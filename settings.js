import {
    @Vigilant,
    @SwitchProperty,
    @SelectorProperty,
    @CheckboxProperty,
    @ButtonProperty,
    @SliderProperty,
    @TextProperty
} from '../Vigilance/index';
import { BOLD, AQUA, RESET, DARK_GRAY } from "./exports";

@Vigilant('TurtleAddons', `${AQUA + BOLD}TurtleAddons`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Kuudra', 'Slayers', 'Dungeons', 'Discord Webhook'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class settings {
    constructor() {
        this.initialize(this);

        this.addDependency("Highlight Stun Block", "Nether Brick Stun Helper");
        this.addDependency("Highlight Etherwarp Block", "Nether Brick Stun Helper");
        this.addDependency("Don't Send To Party", "Party True DPS Message");
        this.addDependency("Webhook Link", "Discord Webhook");
        this.addDependency("Message to Match", "Discord Webhook");
        this.addDependency("Message to Send", "Discord Webhook");
        this.addDependency("Send Coordinates", "Discord Webhook");
        this.addDependency("Name", "Discord Webhook");
        this.addDependency("Profile Picture", "Discord Webhook");
        this.addDependency("Only Non-Player Messages", "Discord Webhook");
        this.addDependency("Alert Radius", "Energized Chunk Alert");
        this.addDependency("Phoenix Level", "Phoenix Invinicibility Timer");
        this.addDependency("Time Before Warning", "Smoldering Polarization Warning");
        
        this.setCategoryDescription("Dungeons", `Most features ${BOLD}REQUIRE ${RESET}enabling boss dialogue`);
    }

    // General
    @ButtonProperty({
        name: "GitHub",
        description: `Link to GitHub`,
        category: "General",
        subcategory: "GitHub",
        placeholder: "Visit GitHub"
    })
    gitHubLink() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/TurtleGD/TurtleAddons"));
    }

    @SwitchProperty({
        name: 'Level Up Sound Effect',
        description: `Disfigure - Blank.`,
        category: 'General',
        subcategory: 'Miscellaneous'
    })
    levelSound = false;

    @SwitchProperty({
        name: 'Kicked To Lobby Timer',
        description: `Timer under crosshair when you get kicked to lobby.`,
        category: 'General',
        subcategory: 'Miscellaneous'
    })
    kickedTimer = false;

    // Kuudra
    @SwitchProperty({
        name: 'Nether Brick Stun Helper',
        description: `Highlights the blocks used for nether brick stunning.\n(Requires at least 1500 mining speed).`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    stunHelper = false;

    @CheckboxProperty({
        name: 'Highlight Stun Block',
        description: `Highlights the nether brick block to break.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    stunBlock = false;

    @CheckboxProperty({
        name: 'Highlight Etherwarp Block',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    etherwarpBlock = false;

    @CheckboxProperty({
        name: 'Highlight Animation Skip Block (T5 Only)',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    skipBlock = false;

    @CheckboxProperty({
        name: 'Highlight Insta-Stun Etherwarp Block',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    instaStunEtherwarpBlock = false;

    @SwitchProperty({
        name: 'Party True DPS Message',
        description: `Sends party dps in chat after Kuudra is dead.`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    partyDps = false;

    @SwitchProperty({
        name: "Don't Send To Party",
        description: `Sends the message to yourself.`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    partyDpsNoSend = false;

    @SwitchProperty({
        name: 'Energized Chunk Alert',
        description: `Alerts and pings you if a chunk is near you.\n(No idea the actual explosion range is cba testing)`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    chunkAlert = false;

    @SliderProperty({
        name: 'Alert Radius',
        description: 'Select the distance to chunk to alert.',
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra',
        min: 5,
        max: 10
    })
    chunkRadius = 7;

    @SwitchProperty({
        name: 'Rend Arrow Alert',
        description: `Alerts and pings you when you have hit 5 arrows with a rend bow. Requires terror and max stacks.\n(A little buggy)`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    rendArrows = false;

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

    @SwitchProperty({
        name: 'Smoldering Polarization Warning',
        description: 'Alerts you x minutes before you run out.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    gummyWarning = false;

    @SliderProperty({
        name: 'Time Before Warning',
        description: 'Select time in minutes.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
        min: 1,
        max: 10
    })
    gummyTimer = 5;

    @SwitchProperty({
        name: 'Disable Hellion Shield Messages',
        description: 'Hides "Strike using the x attunement on your dagger!" messages.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    hideAttunements = false;

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

    @TextProperty({
        name: 'Early P2 Entry Message',
        description: 'Message to send when entering p2 early.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    entryMessage = '';

    @SwitchProperty({
        name: 'Bonzo Mask Invinicibility Timer',
        description: 'Timer under crosshair for invincibility.',
        category: 'Dungeons',
        subcategory: 'Invincibility Timers',
    })
    bonzoInvinicibility = false;

    @SwitchProperty({
        name: 'Spirit Mask Invinicibility Timer',
        description: 'Timer under crosshair for invincibility.',
        category: 'Dungeons',
        subcategory: 'Invincibility Timers',
    })
    spiritInvinicibility = false;

    @SwitchProperty({
        name: 'Phoenix Invinicibility Timer',
        description: 'Timer under crosshair for invincibility.',
        category: 'Dungeons',
        subcategory: 'Invincibility Timers',
    })
    phoenixInvinicibility = false;

    @SliderProperty({
        name: 'Phoenix Level',
        description: 'Select phoenix level.',
        category: 'Dungeons',
        subcategory: 'Invincibility Timers',
        min: 1,
        max: 100
    })
    phoenixLevel = 1;

    // Discord
    @SwitchProperty({
        name: 'Discord Webhook',
        description: 'Sends a discord message to a channel when a certain message is found in chat.',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    discordWebhook = false;

    @TextProperty({
        name: 'Webhook Link',
        description: 'Webhook to send message to\nGet link from Server Settings > Integrations > Webhooks > New Webhook > Copy Webhook URL',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
        protected: true,
    })
    webhookLink = '';

    @TextProperty({
        name: 'Message to Match',
        description: 'Sends a custom message if it contains the message in the text box',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookMatch = '';

    @TextProperty({
        name: 'Message to Send',
        description: 'Custom message that will be sent\nEnter "chat" to send the actual chat message',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookMessage = '';

    @CheckboxProperty({
        name: 'Send Coordinates',
        description: 'Adds coords to the message',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookCoords = false;

    @TextProperty({
        name: 'Name',
        description: 'Paste name to use',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookName = '';

    @TextProperty({
        name: 'Profile Picture',
        description: 'Paste link to use as the profile picture',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookPfp = '';

    @CheckboxProperty({
        name: 'Only Non-Player Messages',
        description: 'Will not send if the message matches but is sent by a player',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookNonPlayer = false;
}

export default new settings();
