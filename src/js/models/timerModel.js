import { elements } from "../elements";

export default class Timer {
  constructor(state) {
    this.state = state;
  }
  cogerTiempo() {
    const tiempoActual = new Date();
    const milisegundosActuales = tiempoActual.getTime();
    return milisegundosActuales;
  }
  formatearNumero(numero) {
    const numeroFormat = numero / 1000;
    const numeroFormatArray = numeroFormat.toString().split(".");
    const numeroSinDecimal = numeroFormatArray[0];
    const numeroDecimal = numeroFormatArray[1];
    const decimalFormateado = `.${numeroDecimal.slice(0, 2)}`;
    if (numeroSinDecimal >= 60) {
      let segundos;
      let minutos;
      minutos = `${Math.floor(numeroSinDecimal / 60)}:`;
      segundos = `${numeroSinDecimal % 60}`;
      const numeroSinDecimalFormat = `${minutos}${segundos}`;
      const numeroFinal = `${numeroSinDecimalFormat}${decimalFormateado}`;
      return numeroFinal;
    } else {
      const numeroFinal = `${numeroSinDecimal}${decimalFormateado}`;
      return numeroFinal;
    }
  }
  pararTimer() {
    this.state.tiempoFinal = this.cogerTiempo();
    const tiempoTotal = this.state.tiempoFinal - this.state.tiempoInicial;
    const tiempoTotalFormateado = this.formatearNumero(tiempoTotal);
    elements.numerosTimer.style.color = "#e4e4e4";
    elements.webAppContainer.style.display = "grid";
    this.state.estado.active = false;
    return tiempoTotalFormateado;
  }
}
