import "../main.scss";
import { elements } from "./elements";
import * as timerView from "./views/timerView";
import * as listaTimesView from "./views/listaTimesView";
import Timer from "./models/timerModel";
import ListaTiempos from "./models/listaTimesModel";
// estado de la app
const state = {};
let timer;
state.estado = [];
state.listaTiempos = new ListaTiempos();
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

const actualizarTimer = () => {
  const tiempo = timer.pararTimer();
  timerView.renderTiempoFormateado(tiempo);
  state.listaTiempos.subirAlState(tiempo);
  state.listaTiempos.mediaA05(state.listaTiempos.lista);
  listaTimesView.renderTimeEnTabla(tiempo);
};
//events del timer
window.addEventListener("keydown", timerController);
window.addEventListener("keyup", startTimer);

const test = new ListaTiempos();
test.mediaA05([
  "0.01",
  "0.07",
  "3.8",
  "0.08",
  "0.06",
  "2.09",
  "0.09",
  "0.07",
  "59.05",
  "0.95"
]);
