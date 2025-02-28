import { pogData } from "./utils/pogData";
import {
    @Vigilant,
    @SwitchProperty,
    @SelectorProperty,
    @CheckboxProperty,
    @ButtonProperty,
    @SliderProperty,
    @ColorProperty, 
    @TextProperty,
    Color } from '../Vigilance/index';
import { BOLD, AQUA, RESET, DARK_GRAY } from "./utils/formatting";

@Vigilant('TurtleAddons', `${AQUA + BOLD}TurtleAddons ${JSON.parse(FileLib.read("TurtleAddons", "metadata.json")).version}`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Combat', 'Kuudra', 'Mining', 'Slayers', 'Dungeons', 'Fishing', 'Party Commands', 'Discord Webhook', 'Credits'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class settings {
    constructor() {
        this.initialize(this);

        this.addDependency("Nether Brick Stun Block", "Stun Waypoints");
        this.addDependency("Nether Brick Etherwarp Block", "Stun Waypoints");
        this.addDependency("Animation Skip Block (T5 Only)", "Stun Waypoints");
        this.addDependency("Pickobulus Etherwarp Block", "Stun Waypoints");
        
        this.addDependency("Entry Timer", "Stun Timer");

        this.addDependency("Send To Party", "Party True DPS Message");

        this.addDependency("Only Show If Dead", "True HP Display");

        this.addDependency("Webhook Link", "Discord Webhook");
        this.addDependency("Chat Regex", "Discord Webhook");
        this.addDependency("Webhook Message", "Discord Webhook");
        this.addDependency("Send Coordinates", "Discord Webhook");
        this.addDependency("Webhook Name", "Discord Webhook");
        this.addDependency("Webhook Profile Picture", "Discord Webhook");
        this.addDependency("Server Messages", "Discord Webhook");
        this.addDependency("Webhook Timestamp", "Discord Webhook");

        this.addDependency("Announce Usage", "Mask/Phoenix Invinicibility Timers");
        this.addDependency("Phoenix Level", "Mask/Phoenix Invinicibility Timers");

        this.addDependency("Room Name", "Send Message on Specific Room Entry");
        this.addDependency("Room Entry Message", "Send Message on Specific Room Entry");

        this.addDependency("Gyro Color", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Gyro RGB", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Gyro Ring Width", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Gyro Ring Opacity", "Gyrokinetic Wand Range Overlay");

        this.addDependency("Glacite Mineshafts Threshold", "Cold Alert");
        this.addDependency("Glacite Tunnels Threshold", "Cold Alert");

        this.addDependency("Scoreboard Widgets", "Custom Scoreboard");
        this.addDependency("Custom Scoreboard Opacity", "Custom Scoreboard");
        this.addDependency("Hide Hypixel IP", "Custom Scoreboard");

        this.addDependency("Announce Blood Cleared", "Blood Room Cleared Alert");

        this.addDependency("Reset Minion Data", "Last Checked Minion Time");

        this.addDependency("Hide Vanilla Nametags", "Teammate Nametags");
        this.addDependency("Add Text Box Shadow", "Teammate Nametags");

        this.setCategoryDescription("General", `Edit gui locations with ${AQUA}/ta gui\nRun ${AQUA}/ta help${RESET} for more info\nRun ${AQUA}/ct load${RESET} if something breaks\n\nMade by ${AQUA}8joh`);
        this.setCategoryDescription("Dungeons", `Most features ${AQUA + BOLD}REQUIRE${RESET} enabling boss dialogue`);
        this.setCategoryDescription("Party Commands", `Prefix: ${AQUA}.;!?\n${DARK_GRAY}`);
    }

    // General
    @ButtonProperty({
        name: "GitHub",
        description: `Link to GitHub`,
        category: "General",
        placeholder: "Visit GitHub"
    })
    gitHubLink() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/TurtleGD/TurtleAddons"));
    }
    
    @ButtonProperty({
        name: "Move Gui Locations",
        description: `move ur things or something`,
        category: "General",
        placeholder: "Move Overlays"
    })
    moveOverlay() {
        ChatLib.simulateChat('ta gui');
    }

    @SelectorProperty({
        name: 'Level Up Sound Effect',
        description: `Plays a sound on any level up except pets (also on milestones)`,
        category: 'General',
        subcategory: 'Sound Effects',
        options: ['None', 'Disfigure - Blank', 'DEAF KEV - Invincible', 'Elektronomia - Sky High', 'Different Heaven & EH!DE - My Heart', 'Different Heaven - Nekozilla', 'TheFatRat - Xenogenesis', 'Random'],
    })
    levelSound = 0;

    @SliderProperty({
        name: 'Level Up Volume',
        description: 'Volume of the sound.',
        category: 'General',
        subcategory: 'Sound Effects',
        min: 1,
        max: 100
    })
    levelVolume = 100;

    @ButtonProperty({
        name: "Level Up Test",
        description: `Plays the sound.`,
        category: "General",
        subcategory: "Sound Effects",
        placeholder: "Play Sound"
    })
    playLevelUp() {
        ChatLib.simulateChat('LEVEL UP');
    }

    @SwitchProperty({
        name: 'Custom Scoreboard',
        description: `Lets you add widgets to the scoreboard.`,
        category: 'General',
        subcategory: 'Custom Scoreboard'
    })
    customScoreboard = false;

    @TextProperty({
        name: 'Scoreboard Widgets',
        description: `Use commas to separate multiple widgets.`,
        category: 'General',
        subcategory: 'Custom Scoreboard'
    })
    scoreboardWidgets = '';

    @SliderProperty({
        name: 'Custom Scoreboard Opacity',
        description: 'Opacity of background.',
        category: 'General',
        subcategory: 'Custom Scoreboard',
        min: 0,
        max: 100
    })
    customScoreboardOpacity = 33;

    @CheckboxProperty({
        name: 'Hide Hypixel IP',
        description: `Hides the ip at the bottom.`,
        category: 'General',
        subcategory: 'Custom Scoreboard'
    })
    hideHypixelIP = false;

    @SwitchProperty({
        name: 'Last Checked Minion Time',
        description: `Puts a timer above a minion that tells you the last time it was checked.\n(Currently does not save across profiles)`,
        category: 'General',
        subcategory: 'Minions'
    })
    lastCheckedMinion = false;

    @ButtonProperty({
        name: "Reset Minion Data",
        description: `Removes all minion data.`,
        category: "General",
        subcategory: 'Minions',
        placeholder: "Reset Minion Data"
    })
    resetMinionData() {
        pogData.minionData.length = 0;
        pogData.save();
    }


    // Combat
    @TextProperty({
        name: 'Hide Non Critical Hits',
        description: `Stops non crits from rendering under a certain damage value.\nOnly use numbers.`,
        category: 'Combat',
        subcategory: 'Miscellaneous'
    })
    hideNonCrits = '0';

    @SwitchProperty({
        name: 'Souls Rebound Timer',
        description: `Shows a timer for when souls rebound expires.`,
        category: 'Combat',
        subcategory: 'Timers',
    })
    srbTimer = false;

    @SwitchProperty({
        name: 'Crimson Stack Timer',
        description: `Shows a timer under your crosshair for when you lose a crimson stack.`,
        category: 'Combat',
        subcategory: 'Timers',
    })
    crimsonTimer = false;


    // Kuudra
    @SwitchProperty({
        name: 'Stun Waypoints',
        description: `Highlights the blocks used for nether brick stunning.\n(Requires at least 1500 mining speed).`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    stunWaypoints = false;

    @CheckboxProperty({
        name: 'Nether Brick Stun Block',
        description: `Highlights the block to break.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    netherBrickStun = false;

    @CheckboxProperty({
        name: 'Nether Brick Etherwarp Block',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    netherBrickEtherwarp = false;

    @CheckboxProperty({
        name: 'Animation Skip Block (T5 Only)',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    skipBlock = false;

    @CheckboxProperty({
        name: 'Pickobulus Etherwarp Block',
        description: `Highlights the block to etherwarp to.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    pickobulusStun = false;

    @SwitchProperty({
        name: 'Stun DPS',
        description: `Tells you the dps for stun.\n(Might break if you stun cause render distance and kuudra entity)`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    stunDps = false;

    @SwitchProperty({
        name: 'Stun Timer',
        description: `Tells you how long it took for a pod to break.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    stunTimer = false;

    @CheckboxProperty({
        name: 'Entry Timer',
        description: `Tells you how long it took for you to enter kuudra.`,
        category: 'Kuudra',
        subcategory: 'Stunning'
    })
    entryTimer = false;

    @SwitchProperty({
        name: 'Party True DPS Message',
        description: `Sends party dps in chat after Kuudra is dead.`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    partyDps = false;

    @CheckboxProperty({
        name: "Send To Party",
        description: `Sends the message to the party.`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    sendPartyDps = false;
    
    @SwitchProperty({
        name: 'True HP Display',
        description: `Shows true kuudra hp on the bottom of the cube.`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    trueHPDisplay = false;

    @CheckboxProperty({
        name: 'Only Show If Dead',
        description: `Hides the display when you are alive (you already have one).`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    deadHPDisplay = false;

    @SwitchProperty({
        name: 'Energized Chunk Alert',
        description: `Alerts and pings you if a chunk is near you.\n(Should probably have the correct range)`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    chunkAlert = false;

    @SwitchProperty({
        name: 'Rend Pull',
        description: `Tells you how much people pull on Kuudra (might count two pulls as one if pulling on same tick, 25m+ pulls).`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    rendPull = false;

    @SwitchProperty({
        name: 'Supply Drop Times',
        description: `Replaces the supply message with one with accurate times.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    supplyTimes = false;
    
    @SwitchProperty({
        name: 'Hide Mob Nametags',
        description: `Removes the health nametag of mobs.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    hideKuudraNametags = false;

    @SliderProperty({
        name: 'Average Pre Outlier Threshold',
        description: 'Will not record times past this for /avgpre.',
        category: 'Kuudra',
        subcategory: 'Kuudra',
        min: 1,
        max: 120
    })
    outlierThreshold = 60;
    

    // Mining
    @SwitchProperty({
        name: 'Corpses Waypoints',
        description: 'Marks corpses with a label and beacon.',
        category: 'Mining',
        subcategory: 'Glacite Tunnels',
    })
    corpseWaypoint = false;

    @SwitchProperty({
        name: 'Mineshaft Exit Waypoints',
        description: 'Marks the mineshaft exit with a label and beacon.',
        category: 'Mining',
        subcategory: 'Glacite Tunnels',
    })
    mineshaftExitWaypoint = false;
    
    @SwitchProperty({
        name: 'Announce Corpses',
        description: 'Tells your party what corpses are in a mineshaft when entering. Requires "Frozen Corpse" in tab list.',
        category: 'Mining',
        subcategory: 'Glacite Tunnels',
    })
    corpseAnnounce = false;
    
    @SwitchProperty({
        name: 'Cold Alert',
        description: 'Alerts you when you reach a cold threshold.',
        category: 'Mining',
        subcategory: 'Glacite Tunnels',
    })
    coldAlert = false;

    @SliderProperty({
        name: 'Glacite Tunnels Threshold',
        description: 'Cold threshold. Use 0 to disable.',
        category: 'Mining',
        subcategory: 'Glacite Tunnels',
        min: 0,
        max: 99
    })
    tunnelColdThreshold = 0;

    @SliderProperty({
        name: 'Glacite Mineshafts Threshold',
        description: 'Cold threshold. Use 0 to disable.',
        category: 'Mining',
        subcategory: 'Glacite Tunnels',
        min: 0,
        max: 99
    })
    mineshaftColdThreshold = 0;


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
        name: 'True Slayer Kill Time',
        description: 'Gets slayer kill time and does not include spawn/death animation. (Might be a little inaccurate)',
        category: 'Slayers',
        subcategory: 'Slayers',
    })
    slayerKillTime = false;

    @SwitchProperty({
        name: 'Disable Hellion Shield Messages',
        description: 'Hides "Strike using the x attunement on your dagger!" messages.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    hideAttunements = false;

    @SwitchProperty({
        name: 'Disable Demon Damage Messages',
        description: 'Hides the damage messages when you get hit.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    hideDemonMessages = false;

    @SwitchProperty({
        name: 'Fire Pillar Alert',
        description: 'Makes a display thats similar to other mods (soopy laggy??)',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    blazePillar = false;

    @SwitchProperty({
        name: 'Hide Fireballs',
        description: 'Hides fireballs from all blazes during a boss.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    hideFireballs = false;

    @SwitchProperty({
        name: 'Smoldering Polarization Timer',
        description: 'Displays a GUI for smoldering polarization.\nOpen /effects to update timer.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    smolderingPolarizationTimer = false;
    

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
        description: 'Creates a waypoint to place the correct corrupted relic.',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    relicWaypoint = false;

    @SwitchProperty({
        name: 'Relic Timer',
        description: 'Creates a timer above relics until spawn',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    relicTimer = false;

    @SwitchProperty({
        name: `Dragon Count Notification`,
        description: `Creates a subtitle on dragon death.[WIP]\nMay break if dragons exit render distance.`,
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    dragSkipTitle = false;

    @SwitchProperty({
        name: `Dragon Death Time`,
        description: `Tells you how long it took to kill a dragon.\nMay break if dragons exit render distance.`,
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    dragDeathTimer = false;

    @SwitchProperty({
        name: `Dragon Spawn Time`,
        description: `Tells you how long until a dragon spawns with server ticks.`,
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    dragSpawnTimer = false;

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

    @SwitchProperty({
        name: 'Highlight Terminals',
        description: `Boxes them in green/red if done or not.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    highlightTerminals = false;

    @SwitchProperty({
        name: 'Announce Pre Device Completion',
        description: `Sends a message when you finish.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    announcePre2to4 = false;

    @SwitchProperty({
        name: 'Announce EE2 - EE5',
        description: `Sends a message when you enter early.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    announceEarlyP3 = false;

    @SwitchProperty({
        name: 'Goldor Tick Timer',
        description: `Makes a subtitle for Goldor explosions.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    goldorTickTimer = false;

    @SliderProperty({
        name: 'Custom Terminal GUI Scale',
        description: 'Changes GUI scale when in terminals.\n(Uses vanilla gui scale values, 0 to disable, 2 is Normal scale)',
        category: 'Dungeons',
        subcategory: 'Terminals',
        min: 0,
        max: 10
    })
    terminalGuiScale = 0;

    @SwitchProperty({
        name: 'Announce Leaps',
        description: 'Sends a message in party chat when leaping to someone.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    announceLeaps = false;

    @SwitchProperty({
        name: 'Teammate Nametags',
        description: 'Puts larger custom nametags above players.',
        category: 'Dungeons',
        subcategory: 'Teammate Nametags',
    })
    teammateNametags = false;

    @CheckboxProperty({
        name: 'Hide Vanilla Nametags',
        description: 'Hides the normal nametags. May break player outlines and similar features from other mods.',
        category: 'Dungeons',
        subcategory: 'Teammate Nametags',
    })
    teammateNametagsHideVanilla = false;

    @CheckboxProperty({
        name: 'Add Text Box Shadow',
        description: 'Adds a black box behind the text.',
        category: 'Dungeons',
        subcategory: 'Teammate Nametags',
    })
    teammateNametagsAddTextBoxShadow = false;

    @TextProperty({
        name: 'Early P2 Entry Message',
        description: 'Message to send when entering P2 early. (Only sends if mage or bers).',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    p2EntryMessage = '';

    @SwitchProperty({
        name: 'Storm Stunned Alert',
        description: 'Makes a title and plays a sound when storm is crushed.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    stormStunnedAlert = false;

    @SwitchProperty({
        name: 'Announce Mimic Dead',
        description: 'Announces "Mimic Dead!" when mimic is killed. (hey skytils fix ur mimic announce)',
        category: 'Dungeons',
        subcategory: 'Mimic',
    })
    announceMimicDead = false;

    @SwitchProperty({
        name: "Color Mimic Chests",
        description: 'Turns trapped chests red.',
        category: 'Dungeons',
        subcategory: 'Mimic',
    })
    colorMimicChests = false;

    @TextProperty({
        name: 'Death Message',
        description: `Sends a message whenever someone dies. Use ${AQUA}[name]${RESET} to use player name.`,
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    deathMessage = '';

    @SwitchProperty({
        name: "Puzzle Fail Draft",
        description: 'Sends a clickable message to take a draft from sacks.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    architectsFirstDraft = false;

    @SwitchProperty({
        name: "Server Lag Times",
        description: 'Sends a message showing server lag times.\nAlso works for Kuudra.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    serverLagTimes = false;

    @SwitchProperty({
        name: 'Send Message on Specific Room Entry',
        description: `Sends a message when you enter a specified room. CURRENTLY BROKEN UNTIL ROOM IDS ARE BACK.`,
        category: 'Dungeons',
        subcategory: 'Message On Room',
    })
    sendRoomEntryMessage = false;

    @TextProperty({
        name: 'Room Name',
        description: `Use /getroom in a dungeon room to get the name. Use commas to separate multiple rooms.`,
        category: 'Dungeons',
        subcategory: 'Message On Room',
    })
    roomName = '';

    @TextProperty({
        name: 'Room Entry Message',
        description: `Message to send when entering the specified room. Use ${AQUA}[name]${RESET} to use room name.`,
        category: 'Dungeons',
        subcategory: 'Message On Room',
    })
    roomEntryMessage = '';

    @SwitchProperty({
        name: 'Mask/Phoenix Invinicibility Timers',
        description: 'Timer next to crosshair for invincibility.',
        category: 'Dungeons',
        subcategory: 'Invinicibility Timers',
    })
    maskTimer = false;

    @CheckboxProperty({
        name: 'Announce Usage',
        description: 'Sends a message in party chat when mask/phoenix procs.',
        category: 'Dungeons',
        subcategory: 'Invinicibility Timers',
    })
    announceUsage = false;

    @SliderProperty({
        name: 'Phoenix Level',
        description: 'Uses phoenix level for invincibility time.',
        category: 'Dungeons',
        subcategory: 'Invinicibility Timers',
        min: 1,
        max: 100
    })
    phoenixLevel = 1;

    @SwitchProperty({
        name: 'Class Ultimate Use Alert',
        description: 'Makes a title when you use your ult.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    ultAlert = false;

    @SwitchProperty({
        name: 'Healer Wish Alerts',
        description: 'Notifies you when to use wishes in M7.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    wishAlerts = false;

    @SwitchProperty({
        name: 'Blood Room Cleared Alert',
        description: 'Notifies you when blood is fully cleared.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    bloodAlerts = false;

    @CheckboxProperty({
        name: 'Announce Blood Cleared',
        description: 'Also notifies your party when blood is fully cleared.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    bloodAlertsParty = false;

    @SwitchProperty({
        name: 'Gyrokinetic Wand Range Overlay',
        description: 'Draws a circle of gyro range.',
        category: 'Dungeons',
        subcategory: 'Gyrokinetic Wand',
    })
    gyroDisplay = false;

    @ColorProperty({
        name: 'Gyro Color',
        description: `Color of gyro ring.`,
        category: 'Dungeons',
        subcategory: 'Gyrokinetic Wand'
    })
    gyroColor = Color.CYAN;

    @SliderProperty({
        name: 'Gyro RGB',
        description: 'RGB Speed. Use 0 to disable.',
        category: 'Dungeons',
        subcategory: 'Gyrokinetic Wand',
        min: 0,
        max: 5
    })
    rgbGyro = 0;

    @SliderProperty({
        name: 'Gyro Ring Width',
        description: 'Width of gyro ring.',
        category: 'Dungeons',
        subcategory: 'Gyrokinetic Wand',
        min: 1,
        max: 100
    })
    gyroRing = 2;

    @SliderProperty({
        name: 'Gyro Ring Opacity',
        description: 'Opacity of gyro ring.',
        category: 'Dungeons',
        subcategory: 'Gyrokinetic Wand',
        min: 1,
        max: 100
    })
    gyroOpacity = 100;
    
    
    // Fishing
    @SwitchProperty({
        name: 'Reindrake HP Display',
        description: 'Puts a hits display on reindrakes.',
        category: 'Fishing',
        subcategory: 'Jerry Island',
    })
    reindrakeHP = false;
    

    // Party Commands
    @SwitchProperty({
        name: 'Party Commands',
        description: 'ptme, warp, allinv, transfer/pt/inv/kick [name], f/m/[1-7], t[1-5].',
        category: 'Party Commands',
        subcategory: 'Party Commands',
    })
    partyCommands = false;


    // Discord
    @SwitchProperty({
        name: 'Discord Webhook',
        description: 'Sends a discord message to a channel when a certain message is matched in chat.',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    discordWebhook = false;

    @TextProperty({
        name: 'Webhook Link',
        description: 'Webhook to send the message to\nGet link from Server Settings > Integrations > Webhooks > New Webhook > Copy Webhook URL',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
        protected: true,
    })
    webhookLink = '';

    @TextProperty({
        name: 'Chat Regex',
        description: 'Regex to match the message to',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookRegex = '';

    @TextProperty({
        name: 'Webhook Message',
        description: `Custom message that will be sent\nUse ${AQUA}[message]${RESET} to send the actual chat message`,
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookMessage = '';

    @CheckboxProperty({
        name: 'Send Coordinates',
        description: 'Adds your coords to the message',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookCoords = false;

    @TextProperty({
        name: 'Webhook Name',
        description: 'Webhook Name',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookName = '';

    @TextProperty({
        name: 'Webhook Profile Picture',
        description: 'Webhook Profile Picture',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookPfp = '';

    @CheckboxProperty({
        name: 'Server Messages',
        description: 'Will not send if the message is sent by a player',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookNonPlayer = false;

    @CheckboxProperty({
        name: 'Webhook Timestamp',
        description: 'Adds a timestamp',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookTimestamp = false;



    // Credits
    @ButtonProperty({
        name: "Volcaronitee",
        description: ``,
        category: "Credits",
        placeholder: " "
    })
    a() {}

    @ButtonProperty({
        name: "Nwjn",
        description: ``,
        category: "Credits",
        placeholder: " "
    })
    b() {}

    @ButtonProperty({
        name: "UnclaimedBloom6",
        description: ``,
        category: "Credits",
        placeholder: " "
    })
    c() {}

    @ButtonProperty({
        name: "sirhypernova",
        description: ``,
        category: "Credits",
        placeholder: " "
    })
    d() {}
}

export default new settings();

