export default class ListaTimes {
  constructor() {
    this.lista = [];
  }
  formatearSegundosMinutos(tiempo) {
    if (tiempo > 60) {
      return `${Math.floor(tiempo / 60)}:${Math.round((tiempo % 60) * 100) /
        100}`;
    } else {
      return `${Math.round(tiempo * 100) / 100}`;
    }
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
  hacerMediaArray(arrayMedias) {
    const sumaArrayMedias = arrayMedias.reduce(
      (accumulator, cur) => accumulator + cur,
      0
    );
    const mediaArray = this.formatearSegundosMinutos(
      sumaArrayMedias / arrayMedias.length
    );
    return mediaArray;
  }
  mediaA05(tiempos) {
    if (this.lista.length >= 5) {
      const ultimos5 = tiempos.slice(tiempos.length - 5, tiempos.length);
      const masBajo = ultimos5.reduce((accumulator, cur) => {
        if (accumulator === -1) {
          return cur;
        } else if (accumulator > cur) {
          return cur;
        } else {
          return accumulator;
        }
      }, -1);
      const masAlto = ultimos5.reduce((accumulator, cur) => {
        if (accumulator === -1) {
          return cur;
        } else if (accumulator < cur) {
          return cur;
        } else {
          return accumulator;
        }
      }, -1);
      const indexAlto = ultimos5.indexOf(masAlto);
      ultimos5.splice(indexAlto, 1);
      const indexBajo = ultimos5.indexOf(masBajo);
      ultimos5.splice(indexBajo, 1);
      const mediaAo5 = this.hacerMediaArray(ultimos5);
      return mediaAo5;
    } else if (this.lista.length > 0) {
      return this.hacerMediaArray(this.lista);
    }
  }
  mediaAll(tiempos) {
    return this.hacerMediaArray(tiempos);
  }
}
