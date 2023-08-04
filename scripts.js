const d = document
const control = 1

d.addEventListener('click', e => {

  const target = e.target

  if(target.matches('#compras_article_tabs a') || target.matches('#compras_article_tabs li')){
    if(target.matches('a')){
      d.querySelectorAll('#compras_article_tabs li a').forEach(li => li.classList.remove('active'))
      d.querySelectorAll('#compras_article iframe').forEach(li => li.classList.add('d-none'))
      
      const li = target.parentElement
      const id = li.id
      
      target.classList.add('active')

      console.log(li)
      
      const iframe_id = id.replace('_li','_iframe')
      d.getElementById(iframe_id).classList.remove('d-none')
      
    }
    
  }
  
})