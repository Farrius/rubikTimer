import { elements } from "../elements";

export const renderScramble = scramble => {
  elements.scramble.textContent = scramble.join(" ");
};
