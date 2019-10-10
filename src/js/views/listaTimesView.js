import { elements } from "../elements";

export const renderTimeEnTabla = (time, ao5, aoAll) => {
  const markup = `
  <tr>
    <td >${time}</td>
    <td>${ao5}</td>
    <td>
    ${aoAll}<a href="#"><i class="fa fa-close"></i></a>
    </td>
  </tr>
  
  `;
  elements.listaTiempos.insertAdjacentHTML("afterbegin", markup);
};
