import "../main.scss";
import { elements } from "./elements";
import * as methods from "./methods";
import * as timerView from "./views/timerView";
import Timer from "./models/timerModel";
//estado del timer
//let active = false;
//let start = true;
// estado de la app
const state = {};
state.estado = [];
state.estado.active = false;
state.estado.start = true;
//empezar el timer o cambiar el active
const startTimer = () => {
  if (
    event.keyCode === 32 &&
    state.estado.active === false &&
    state.estado.start === true
  ) {
    state.timer = new Timer(state);
    state.tiempoInicial = methods.cogerTiempo();
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
    state.timer.pararTimer();
    state.estado.start = false;
  } else if (state.estado.active === true) {
    state.timer.pararTimer();
  }
};

//events del timer
window.addEventListener("keydown", timerController);
window.addEventListener("keyup", startTimer);
