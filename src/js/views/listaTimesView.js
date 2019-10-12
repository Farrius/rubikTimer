import { elements } from "../elements";

export const renderTimeEnTabla = (time, ao5, aoAll) => {
  const newRow = elements.listaTiempos.insertRow(1);
  const newTimeTd = newRow.insertCell(0);
  const newAo5Td = newRow.insertCell(1);
  const newAoAll = newRow.insertCell(2);
  newTimeTd.textContent = time;
  newAo5Td.textContent = ao5;
  newAoAll.textContent = aoAll;
};
