import {
    @Vigilant,
    @SwitchProperty,
    @SelectorProperty,
    @CheckboxProperty,
    @ButtonProperty,
    @TextProperty
} from '../Vigilance/index';
import { BOLD, AQUA } from "./exports";

@Vigilant('TurtleAddons', `${AQUA + BOLD}TurtleAddons`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Kuudra', 'Slayers', 'Dungeons', 'Discord Webhook'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getPropertyComparator: () => (a, b) => {
        const names = ['Webhook Link', 'Message to Match', 'Message to Send', 'Send Coordinates', 'Ping Someone', 'Name', 'Profile Picture', 'Only Non-Player Messages'];

        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    }
})
class settings {
    constructor() {
        this.initialize(this);

        this.addDependency("Highlight Stun Block", "Nether Brick Stun Helper");
        this.addDependency("Highlight Etherwarp Block", "Nether Brick Stun Helper");

        this.addDependency("Webhook Link", "Discord Webhook");
        this.addDependency("Message to Match", "Discord Webhook");
        this.addDependency("Message to Send", "Discord Webhook");
        this.addDependency("Send Coordinates", "Discord Webhook");
        this.addDependency("Ping Someone", "Discord Webhook");
        this.addDependency("Name", "Discord Webhook");
        this.addDependency("Profile Picture", "Discord Webhook");
        this.addDependency("Only Non-Player Messages", "Discord Webhook");
    }

    // General
    @ButtonProperty({
        name: "GitHub",
        description: `Link to GitHub`,
        category: "General",
        subcategory: "General",
        placeholder: "Visit GitHub"
    })
    gitHubLink() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/TurtleGD/TurtleAddons"));
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
        name: 'Profile Picture',
        description: 'Paste link to use as the profile picture',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookPfp = '';

    @TextProperty({
        name: 'Name',
        description: 'Paste name to use',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookName = '';

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

    @TextProperty({
        name: 'Ping Someone',
        description: 'Enter id to add a mention to the message\,Format is "<@userID>"',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookPing = '';

    @CheckboxProperty({
        name: 'Send Coordinates',
        description: 'Adds coords to the message',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookCoords = false;

    @CheckboxProperty({
        name: 'Only Non-Player Messages',
        description: 'Will not send if the message matches but is sent by a player',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookNonPlayer = false;
}

export default new settings();
