import settings from "../../settings";
import { AQUA, BOLD, RESET } from "../../utils/formatting";
import { pogData } from "../../utils/pogData";

let witherKingMessageTime = undefined;
let showThing = false;

register("chat", () => {
  if (settings.p5RagTimer) {
    witherKingMessageTime = new Date().getTime();
  }
}).setCriteria("[BOSS] Wither King: You... again?");


register("renderOverlay", () => {
  if (witherKingMessageTime) {
    let timeLeftRag = new Date().getTime();
    timeLeftRag = 5 - (timeLeftRag - witherKingMessageTime) / 1000;
    if (timeLeftRag >= 0) {
      Renderer.scale(pogData.p5RagTimerScale);
      Renderer.drawString(`${AQUA + BOLD}Use Rag in: ${RESET + timeLeftRag.toFixed(3)}s`, pogData.p5RagTimerX / pogData.p5RagTimerScale, pogData.p5RagTimerY / pogData.p5RagTimerScale, true);
    }
  } else if (showThing) {
    Renderer.scale(pogData.p5RagTimerScale);
    Renderer.drawString(`${AQUA + BOLD}Use Rag in: ${RESET}5.000s`, pogData.p5RagTimerX / pogData.p5RagTimerScale, pogData.p5RagTimerY / pogData.p5RagTimerScale, true);
  }
})