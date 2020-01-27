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
//estado del timer
state.estado.active = false;
state.estado.ready = false;
//cambiar el color mientras pulsamos o parar el timer
const timerController = () => {
  if (event.keyCode === 32 && state.estado.active === false) {
    setTimeout(() => (state.estado.ready = true), 2000);
    if (state.estado.ready === true) {
      window.addEventListener("keyup", startTimer);
      elements.numerosTimer.style.color = "#045757";
    }
  } else if (event.keyCode === 32 && state.estado.active === true) {
    while (state.estado.vueltas === true) {
      actualizarTimer();
    }
  } else if (state.estado.active === true) {
    actualizarTimer();
    quitarStartTimer();
    state.estado.ready = false;
  }
};
//empezar el timer o cambiar el active
const startTimer = () => {
  if (state.estado.active === false) {
    timer = new Timer(state);
    state.estado.vueltas = true;
    state.tiempoInicial = timer.cogerTiempo();
    elements.webAppContainer.style.display = "none";
    state.estado.active = true;
  } else {
    quitarStartTimer();
  }
};
//quita el event listener del timer
const quitarStartTimer = () => {
  state.estado.active = false;
  window.removeEventListener("keyup", startTimer);
};
//al acabar cada ciclo de timer
const actualizarTimer = () => {
  //parar timer
  const tiempo = timer.pararTimer();
  state.listaTiempos.subirAlState(tiempo);
  //render los tiempos
  renderLosTiempos(tiempo);
  //poner scramble
  funcionDelScramble();
  //marcar el estado
  state.estado.vueltas = false;
  state.estado.ready = false;
};
//render los tiempos
const renderLosTiempos = tiempo => {
  timerView.renderTiempoFormateado(tiempo);
  const mediaAo5 = state.listaTiempos.mediaA05(state.listaTiempos.lista);
  const mediaAoAll = state.listaTiempos.mediaAll(state.listaTiempos.lista);
  listaTimesView.renderTimeEnTabla(tiempo, mediaAo5, mediaAoAll);
  ao5View.renderAo5(mediaAo5);
};
//hacer scramble
const funcionDelScramble = () => {
  const scrambleObject = new Scramble();
  const scramble = scrambleObject.hacerScramble();
  scrambleView.renderScramble(scramble);
};

//events del timer
window.addEventListener("keydown", timerController);
window.addEventListener("load", funcionDelScramble);
//events de la app
//resetear timer
elements.resetButton.addEventListener("click", () => {
  listaTimesView.resetTabla();
  state.listaTiempos.resetLista();
  state.listaTiempos.resetLocalStorage();
});
//quitar un tiempo
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
//cargar local storage
window.addEventListener("load", () => {
  state.listaTiempos.cogerLocalStorage();
  state.listaTiempos.lista.reverse().forEach(cur => {
    renderLosTiempos(cur);
  });
});
