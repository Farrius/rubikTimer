import { elements } from "../elements";

export default class ListaTimes {
  constructor(tiempo) {
    this.lista = [];
  }
  subirAlState(tiempo) {
    if (tiempo.includes(":")) {
      const arrayNum = tiempo.split(":");
      const tiempoSec = parseInt(arrayNum[0] * 60) + parseFloat(arrayNum[1]);
      this.lista.push(tiempoSec);
    } else {
      this.lista.push(parseFloat(tiempo));
    }
  }
  mediaA05(tiempos) {
    if (this.lista.length > 5) {
      const ultimos5 = tiempos.slice(tiempos.length - 5, tiempos.length);
      const masBajo = ultimos5.reduce((accumulator, cur) => {
        cur = cur;
        if (accumulator === -1) {
          return cur;
        } else if (accumulator > cur) {
          return cur;
        } else {
          return accumulator;
        }
      }, -1);
      const masAlto = ultimos5.reduce((accumulator, cur) => {
        cur = cur;
        if (accumulator === -1) {
          return cur;
        } else if (accumulator < cur) {
          return cur;
        } else {
          return accumulator;
        }
      }, -1);
      const indexAlto = ultimos5.indexOf(masAlto);
      const indexBajo = ultimos5.indexOf(masBajo);
      ultimos5.splice(indexAlto, 1);
      ultimos5.splice(indexBajo, 1);
    }
  }
}
