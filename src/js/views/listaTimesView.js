import { elements } from "../elements";
//render una fila de la tabla
export const renderTimeEnTabla = (time, ao5, aoAll) => {
  const newRow = elements.listaTiempos.insertRow(0);
  const newTimeTd = newRow.insertCell(0);
  const newAo5Td = newRow.insertCell(1);
  const newAoAll = newRow.insertCell(2);
  const deleteIcon = newRow.insertCell(3);
  newTimeTd.textContent = time;
  newAo5Td.textContent = ao5;
  newAoAll.textContent = aoAll;
  deleteIcon.className = "delete_icon";
  deleteIcon.appendChild(createIcon());
};
//resetear los tiempos de la tabla
export const resetTabla = () => {
  while (elements.listaTiempos.firstChild) {
    elements.listaTiempos.removeChild(elements.listaTiempos.firstChild);
  }
};
//crear un icon
const createIcon = () => {
  const icon = document.createElement("i");
  icon.className = "fa fa-close";
  return icon;
};
