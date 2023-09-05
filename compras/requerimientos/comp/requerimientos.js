export { requerimientos }

import { elementFromHTML } from "../../../scripts.js";
import { search_html } from "./searchSection.js";
import { resumen } from "./resumen.js";
import { resumenForm } from "./resumenForm.js";
import { btnSection } from "./btnSection.js";
import { title_html } from "./title.js";
import { table_html } from "./tableSection.js";

function requerimientos(){
  const divMain = document.createElement('div')
  divMain.id = 'main_div'
  divMain.classList.add("main_div","w-75","d-flex","flex-column")
  divMain.append(title_html())
  divMain.appendChild(search_html())
  divMain.appendChild(table_html())

  const divEdition = document.createElement('div')
  divEdition.id = 'edition_div'
  divEdition.classList.add("edition_div","w-25","px-3","pe-0","d-flex","flex-column","justify-content-between")
  divEdition.appendChild(resumen())
  divEdition.appendChild(resumenForm())
  divEdition.appendChild(btnSection())

  const article = document.createElement('article')
  article.id = 'compras_requerimientos_article'
  article.classList.add('w-100','flex-grow-1','d-flex','d-none','overflow-scroll')
  article.appendChild(divMain)
  article.appendChild(divEdition)

  return article
  
}
