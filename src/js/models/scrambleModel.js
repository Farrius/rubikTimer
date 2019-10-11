export default class Sramble {
  constructor() {}
  hacerScramble() {
    const listaAllMoves = [
      "R",
      "U",
      "L",
      "B",
      "F",
      "D",
      "R'",
      "U'",
      "L'",
      "B'",
      "F'",
      "D'",
      "R2",
      "U2",
      "L2",
      "B2",
      "F2",
      "D2"
    ];
    let finalScramble = [];
    let listaSinLastMove = Array.prototype.slice.call(listaAllMoves);
    for (let i = 0; i < 21; i++) {
      const randomIndex = Math.floor(Math.random() * listaSinLastMove.length);
      finalScramble.push(listaSinLastMove[randomIndex]);
      const firstLetter = listaSinLastMove[randomIndex];
      let indexLetters = [];
      const listaOnlyLetters = [];
      for (const cur of listaAllMoves) {
        listaOnlyLetters.push(cur[0]);
      }
      for (const cur of listaSinLastMove) {
        if (cur[0] === firstLetter[0]) {
          for (let i = 0; i < 22; i++) {
            indexLetters.push(listaOnlyLetters.indexOf(cur[0], i));
          }
        }
      }
      let indexLettersFormat = [];
      for (const cur of indexLetters) {
        if (cur !== -1) {
          if (indexLettersFormat.includes(cur) === false) {
            indexLettersFormat.push(cur);
          }
        }
      }
      listaSinLastMove = Array.prototype.slice.call(listaAllMoves);
      indexLettersFormat.forEach((cur, index) => {
        if (index === 0) {
          listaSinLastMove.splice(cur, 1);
        } else if (index === 1) {
          listaSinLastMove.splice(cur - 1, 1);
        } else if (index === 2) {
          listaSinLastMove.splice(cur - 2, 1);
        }
      });
    }
    return finalScramble;
  }
}
