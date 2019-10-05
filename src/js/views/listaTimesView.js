import { elements } from "../elements";

export const renderTimeEnTabla = time => {
  const newTd = document.createElement("td");
  newTd.appendChild(document.createTextNode(time));
  const newTr = document.createElement("tr");
  newTr.appendChild(newTd);
  elements.listaTiempos.insertBefore(newTr, elements.listaTiempos.children[1]);
  console.log(elements.listaTiempos);
};
