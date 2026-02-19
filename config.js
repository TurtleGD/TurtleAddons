import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant
} from '../Vigilance/index'
import { Formatting } from "./utils/Formatting"

@Vigilant('TurtleAddons', `${Formatting.AQUA}TurtleAddons ${JSON.parse(FileLib.read("TurtleAddons", "metadata.json")).version}`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Combat', 'Kuudra', 'Dungeons', 'Mining']

        return categories.indexOf(a.name) - categories.indexOf(b.name)
    }
})

class Settings {
    @TextProperty({
        name: 'Custom Scoreboard',
        description: `Adds TabList widgets to the bottom of the scoreboard. Enter widget names, eg. "Stats, Pet"\n\nNote: Currently does not render background due to rectangles not being scalable in this version of ChatTriggers`,
        category: 'General',
        subcategory: 'Scoreboard',
    })
    customScoreboard = ''

    @SwitchProperty({
        name: 'Arrow Poison Tracker',
        description: `Draws an overlay with how many twilight and toxic arrow poison you have.\n\nNote: Currently cannot be scaled due to item icons not being scalable in this version of ChatTriggers`,
        category: 'Combat',
        subcategory: 'Miscellaneous',
    })
    arrowPoisonTracker = false
    
    @SwitchProperty({
        name: "Architect's First Draft Message",
        description: 'Sends a clickable message to take a draft from sacks on puzzle fail.',
        category: 'Dungeons',
        subcategory: 'Dungeons',
    })
    architectsFirstDraft = false

    @SwitchProperty({
        name: 'Highlight Terminals',
        description: `Boxes them in green/red if complete/incomplete.`,
        category: 'Dungeons',
        subcategory: 'Terminals',
    })
    highlightTerminals = false

    @SwitchProperty({
        name: 'Mineshaft Exit Waypoint',
        description: `Marks the exit of glacite mineshafts.`,
        category: 'Mining',
        subcategory: 'Glacite Mineshafts',
    })
    mineshaftExitWaypoint = false

    constructor() {
        this.initialize(this)
        // this.registerListener('text', newText => {
        //     console.log(`Text changed to ${newText}`)
        // })

        this.setCategoryDescription("Dungeons", `Most features ${Formatting.AQUA}REQUIRE${Formatting.RESET} enabling boss dialogue`)
        this.setCategoryDescription("General", `Use ${Formatting.AQUA}/ta gui${Formatting.RESET} to move overlays and ${Formatting.AQUA}/ta help${Formatting.RESET} for more`)

        // this.setSubcategoryDescription('General', 'Category', 'Shows off some nifty property examples.');
    }
}

export default new Settings()
