

import { elementFromHTML } from "../../../scripts.js";

function requerimientos(){
  const divMain = document.createElement('div')
  divMain.id = 'main_div'
  divMain.classList.add("main_div","w-75","d-flex","flex-column")

  const divEdition = document.createElement('div')
  divEdition.id = 'edition_div'
  divEdition.classList.add("edition_div","w-25","px-3","pe-0","d-flex","flex-column","justify-content-between")

  const article = document.createElement('article')
  article.id = 'compras_documentacion_article'
  article.classList.add('w-100','flex-grow-1','d-flex','d-none','overflow-scroll')

  return article
  
}