import { elements } from "../elements";
//hace display del scramble
export const renderScramble = scramble => {
  elements.scramble.textContent = scramble.join(" ");
};
