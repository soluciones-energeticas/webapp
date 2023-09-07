export {requerimientos}

import { title,header } from "./title.js"
import { articleBody } from "./articleBody.js"

function requerimientos(){
  const article = document.createElement('article')

  article.id = 'compras_requerimientos_article'
  article.className = 'compras_article w-100 h-100 d-flex flex-column overflow-hidden d-none'

  article.append(title())
  article.append(header())
  article.append(articleBody())

  return article
  
}