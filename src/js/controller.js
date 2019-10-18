import "../main.scss";
import { elements } from "./elements";
import * as timerView from "./views/timerView";
import * as listaTimesView from "./views/listaTimesView";
import * as ao5View from "./views/ao5View";
import * as scrambleView from "./views/scrambleView";
import Timer from "./models/timerModel";
import ListaTiempos from "./models/listaTimesModel";
import Scramble from "./models/scrambleModel";
// estado de la app
const state = {};
let timer;
state.estado = [];
state.listaTiempos = new ListaTiempos();
//hacer scramble
const funcionDelScramble = () => {
  const scrambleObject = new Scramble();
  const scramble = scrambleObject.hacerScramble();
  scrambleView.renderScramble(scramble);
};

//estado del timer
state.estado.active = false;
state.estado.start = true;
//empezar el timer o cambiar el active
const startTimer = () => {
  if (
    event.keyCode === 32 &&
    state.estado.active === false &&
    state.estado.start === true
  ) {
    timer = new Timer(state);
    state.tiempoInicial = timer.cogerTiempo();
    elements.webAppContainer.style.display = "none";
    state.estado.active = true;
  } else if (event.keyCode === 32 && state.estado.start === false) {
    state.estado.start = true;
  }
};
//cambiar el color mientras pulsamos o parar el timer
const timerController = () => {
  if (
    event.keyCode === 32 &&
    state.estado.active === false &&
    state.estado.start === true
  ) {
    elements.numerosTimer.style.color = "#045757";
  } else if (event.keyCode === 32 && state.estado.active === true) {
    actualizarTimer();
    state.estado.start = false;
  } else if (state.estado.active === true) {
    actualizarTimer();
  }
};
//al acabar cada ciclo de timer
const actualizarTimer = () => {
  const tiempo = timer.pararTimer();
  timerView.renderTiempoFormateado(tiempo);
  state.listaTiempos.subirAlState(tiempo);
  const mediaAo5 = state.listaTiempos.mediaA05(state.listaTiempos.lista);
  const mediaAoAll = state.listaTiempos.mediaAll(state.listaTiempos.lista);
  listaTimesView.renderTimeEnTabla(tiempo, mediaAo5, mediaAoAll);
  ao5View.renderAo5(mediaAo5);
  funcionDelScramble();
};
//al querer resetear el timer
const resetTodo = () => {
  listaTimesView.resetTabla();
  state.listaTiempos.resetLista();
};
//events del timer
window.addEventListener("keydown", timerController);
window.addEventListener("keyup", startTimer);
window.addEventListener("load", funcionDelScramble);
//events de la app
elements.resetButton.addEventListener("click", resetTodo);
elements.listaTiempos.addEventListener("click", e => {
  const row = e.target.parentElement.matches(".row");
  if (row) {
    const actualRow = e.target.parentElement;
    const tableNode = actualRow.parentNode.children;
    const tableArray = [...tableNode];
    const indexElement = tableArray.indexOf(actualRow);
    state.listaTiempos.quitarDelState(indexElement);
    actualRow.parentElement.removeChild(actualRow);
  }
});
