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
import { BOLD, AQUA, RESET, AQUA, DARK_GRAY } from "./utils/formatting";

@Vigilant('TurtleAddons', `${AQUA + BOLD}TurtleAddons ${JSON.parse(FileLib.read("TurtleAddons", "metadata.json")).version}`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Combat', 'Kuudra', 'Mining', 'Slayers', 'Dungeons', 'Fishing', 'Party Commands', 'Events', 'Discord Webhook'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class settings {
    constructor() {
        this.initialize(this);

        this.addDependency("Outlier Threshold", "Record First Two Pre Times")
        this.addDependency("Highlight Stun Block", "Nether Brick Stun Helper");
        this.addDependency("Highlight Etherwarp Block", "Nether Brick Stun Helper");
        this.addDependency("Entry Timer", "Stun Timer");
        this.addDependency("Don't Send To Party", "Party True DPS Message");
        this.addDependency("Only Show If Dead", "True HP Display");
        this.addDependency("Label Second Pre Waypoints", "Second Pre Waypoints");
        this.addDependency("Webhook Link", "Discord Webhook");
        this.addDependency("Message to Match", "Discord Webhook");
        this.addDependency("Message to Send", "Discord Webhook");
        this.addDependency("Send Coordinates", "Discord Webhook");
        this.addDependency("Name", "Discord Webhook");
        this.addDependency("Profile Picture", "Discord Webhook");
        this.addDependency("Only Non-Player Messages", "Discord Webhook");
        this.addDependency("Timestamp", "Discord Webhook");
        this.addDependency("Announce Usage", "Mask/Phoenix Invinicibility Timers");
        this.addDependency("Phoenix Level", "Mask/Phoenix Invinicibility Timers");
        this.addDependency("Room Name", "Send Message on Specific Room Entry");
        this.addDependency("Room Entry Message", "Send Message on Specific Room Entry");
        this.addDependency("Time Before Warning", "Smoldering Polarization Warning");
        this.addDependency("Gyro Color", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Gyro RGB", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Gyro Ring Width", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Gyro Ring Opacity", "Gyrokinetic Wand Range Overlay");
        this.addDependency("Glacite Mineshafts Threshold", "Cold Alert");
        this.addDependency("Glacite Tunnels Threshold", "Cold Alert");
        this.addDependency("Scoreboard Widgets", "Custom Scoreboard");
        this.addDependency("Custom Scoreboard Opacity", "Custom Scoreboard");
        this.addDependency("Pet XP Display (Fishing)", "Pet XP Display");
        this.addDependency("Party Blood Alerts", "Blood Room Alerts");
        this.addDependency("Bloodcamper", "Blood Room Alerts");
        this.addDependency("Reset Minion Time Data", "Last Checked Time");

        this.setCategoryDescription("General", `Edit gui locations with ${AQUA}/ta gui\nRun ${AQUA}/ta help${RESET} for more info`);
        this.setCategoryDescription("Dungeons", `Most features ${AQUA + BOLD}REQUIRE${RESET} enabling boss dialogue`);
        this.setCategoryDescription("Party Commands", `Prefix: ${AQUA};\n${DARK_GRAY}(Semicolon)`);
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

    @SelectorProperty({
        name: 'Level Up Sound Effect',
        description: `Plays a sound on any level up (also on milestones)`,
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
        ChatLib.simulateChat('LEVEL UP')
    }

    @SwitchProperty({
        name: 'Kicked To Lobby Timer',
        description: `Timer next to crosshair when you get kicked to lobby.\nUse /movelobby [x/y/scale] [num] to change pos.`,
        category: 'General',
        subcategory: 'Miscellaneous'
    })
    kickedTimer = false;

    @SwitchProperty({
        name: 'Pet XP Display',
        description: `Shows XP from tab list, requires xp to be visible.\nUse /movepetxp [x/y/scale] [num] to change pos.\n\nRun ${AQUA}/ct load${RESET} if it infinitely loads.`,
        category: 'General',
        subcategory: 'Miscellaneous'
    })
    petXP = false;

    @TextProperty({
        name: 'Pet XP Display (Fishing)',
        description: `Input name of pet to level.\nSaves pet xp when you swap to your fishing pet.`,
        category: 'General',
        subcategory: 'Miscellaneous'
    })
    petXPFishing = '';

    @SwitchProperty({
        name: 'Party Finder Blacklist',
        description: `Automatically kick blacklist players from party finder.\nUse /blacklist [view/add/remove/clear].`,
        category: 'General',
        subcategory: 'Miscellaneous'
    })
    blacklist = false;

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

    @SwitchProperty({
        name: 'Last Checked Time',
        description: `Puts a timer above a minion that tells you the last time it was checked.\n(Will not update if toggled off).\n${DARK_GRAY}(Might fuck up if you swap profiles so you might wanna disable/reset on other profiles)`,
        category: 'General',
        subcategory: 'Minions'
    })
    lastCheckedMinion = false;

    @ButtonProperty({
        name: "Reset Minion Time Data",
        description: `Removes time (and position) data.`,
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
        subcategory: 'Combat'
    })
    hideNonCrits = '0'

    @SwitchProperty({
        name: 'Souls Rebound Timer',
        description: `Shows a timer for when souls rebound expires.\nUse /movesrb [x/y/scale] [num] to change pos.`,
        category: 'Combat',
        subcategory: 'Combat',
    })
    srbTimer = false;


    @SwitchProperty({
        name: 'Crimson Stack Timer',
        description: `Shows a timer under your crosshair for when you lose a crimson stack.`,
        category: 'Combat',
        subcategory: 'Combat',
    })
    crimsonTimer = false;

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
        name: 'Stun DPS',
        description: `Tells you the dps for stun.\n(Might break if you stun cause render distance)`,
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
        name: "Don't Send To Party",
        description: `Sends the message to yourself.`,
        category: 'Kuudra',
        subcategory: 'Infernal Kuudra'
    })
    partyDpsNoSend = false;
    
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
        name: 'Second Pre Waypoints',
        description: `Pearl waypoints for 2nd pre.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    secondWaypoints = false;

    @CheckboxProperty({
        name: 'Label Second Pre Waypoints',
        description: `Labels the waypoints.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    labelSecondWaypoints = false;

    @SwitchProperty({
        name: 'Record First Two Pre Times',
        description: `Records supply placements.\nView first and second averages with /avgpre [pre].\nLeave pre as blank to view overall averages.\nClear data with /clearpres.`,
        category: 'Kuudra',
        subcategory: 'Kuudra'
    })
    recordPreTimes = false;

    @SliderProperty({
        name: 'Outlier Threshold',
        description: 'Will not record times past this.',
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
        name: 'Smoldering Polarization Warning',
        description: `Alerts you x minutes before you run out.\nAlso enables a timer display.\nUse /movegummy [x/y/scale] [num] to change pos.\n\nThe timer is an ${AQUA + BOLD}APPROXIMATION${RESET} and will most likely be a few minutes ${RESET}lower.`, // why the fuck is lower bold without the reset
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    gummyWarning = false;

    @SliderProperty({
        name: 'Time Before Warning',
        description: 'Time in minutes.',
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

    @SwitchProperty({
        name: 'Disable Demon Damage Messages',
        description: 'Hides the damage messages when you get hit.',
        category: 'Slayers',
        subcategory: 'Inferno Demonlord',
    })
    hideDemonMessages = false;

    @SwitchProperty({
        name: 'Fire Pillar Alert',
        description: 'Makes a display thats similar to other mods (soopy laggy??)\nUse /movepillar [x/y/scale] [num] to change pos.',
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
    

    // Dungeons
    @SwitchProperty({
        name: 'P5 Ragnarock Axe Timer',
        description: 'Tells you when to rag axe during the dragons phase.\nActivates rag axe 5s before dragons spawn.\nUse /moverag [x/y/scale] [num] to change pos',
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
        name: 'Dragon Count Notification',
        description: 'Creates a subtitle on dragon death.',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    dragSkipTitle = false;

    @SwitchProperty({
        name: 'Dragon Death Time',
        description: 'Tells you how long it took to kill a dragon.',
        category: 'Dungeons',
        subcategory: 'Wither King',
    })
    dragDeathTimer = false;

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
        name: 'Announce Pre2 - Pre4 Completion',
        description: `Sends a message when you finish.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    announcePre2to4 = false;

    @SwitchProperty({
        name: 'Announce Early 3.2 - 3.5 Entry',
        description: `Sends a message when you enter early.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    announceEarlyP3 = false;

    @SwitchProperty({
        name: 'Announce Leaps',
        description: 'Sends a message in party chat when leaping to someone.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    announceLeaps = false;

    @TextProperty({
        name: 'Early P2 Entry Message',
        description: 'Message to send when entering p2 early. (Only sends if mage).',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    p2EntryMessage = '';

    @TextProperty({
        name: 'Death Message',
        description: `Sends a message whenever someone dies. Use ${AQUA}[name]${RESET} to use player name.`,
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    deathMessage = '';

    @SwitchProperty({
        name: 'Send Message on Specific Room Entry',
        description: `Sends a message when you enter a specified room.`,
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
        description: 'Timer next to crosshair for invincibility.\nUse /movemask [x/y/scale] [num] to change pos',
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
        name: 'Watcher Dialogue Skip Alert',
        description: 'Notifies you when to start killing mobs.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    watcherDialogueSkip = false;

    @SwitchProperty({
        name: 'Healer Wish Alerts',
        description: 'Notifies you when to use wishes in M7.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    wishAlerts = false;

    @SwitchProperty({
        name: 'Blood Room Alerts',
        description: 'Notifies you when blood is fully spawned/cleared.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    bloodAlerts = false;

    @CheckboxProperty({
        name: 'Party Blood Alerts',
        description: 'Also notifies your party when blood is fully spawned/cleared.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    bloodAlertsParty = false;

    @CheckboxProperty({
        name: 'Bloodcamper',
        description: 'Only notifies when blood is cleared.',
        category: 'Dungeons',
        subcategory: 'Alerts',
    })
    bloodcamper = false;

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
    gyroColor = Color.CYAN

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


    // Events
    @SwitchProperty({
        name: 'Bingo Overlay',
        description: 'Puts your uncompleted goals on screen. (Open goal page to update).',
        category: 'Events',
        subcategory: 'Bingo',
    })
    bingoOverlay = false;


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

    @CheckboxProperty({
        name: 'Timestamp',
        description: 'Adds a timestamp',
        category: 'Discord Webhook',
        subcategory: 'Discord Webhook',
    })
    webhookTimestamp = false;


    // Fishing
    @TextProperty({
        name: 'Underground Block Overlay [WIP]',
        description: 'Draws an overlay over lava/water that nerfs fishing speed.\nUse /checkunderground [distance] to check blocks in a square around you, more = laggier.\nUse /clearunderground to clear the overlay\n(Constantly checking laggy rn)',
        category: 'Fishing',
        subcategory: 'Fishing',
    })
    ammonite = '(This box does nothing)';


    // Party Commands
    @SwitchProperty({
        name: 'Join Instance Commands',
        description: 'Kuudra and Dungeons, "f7", "t5", etc.',
        category: 'Party Commands',
        subcategory: 'Party Commands',
    })
    instanceCommands = false;

    @SwitchProperty({
        name: 'Leader Commands',
        description: 'transfer, warp, allinv, kick [name].',
        category: 'Party Commands',
        subcategory: 'Party Commands',
    })
    leaderCommands = false;
}

export default new settings();

