import { elements } from "../elements";
//hace render del time del medio
export const renderTiempoFormateado = tiempo => {
  elements.numerosTimer.textContent = tiempo;
};
