export { afterAcceptClick }

import { globalNovedades, url } from "../novedades.js"
import { setTableContent } from "../renders/tableRender.js"

async function afterAcceptClick(form,btn,target,spinner){
  const formData = new FormData(form)
  const dataBody = {}
  
  for (let pair of formData.entries()) {
    if(pair[0] == 'files'){
      if(!pair[1].name) continue
      
      if(dataBody[pair[0]]){
        dataBody[pair[0]].push(pair[1])
        continue
      }
      
      dataBody[pair[0]] = [pair[1]]
      continue
    }
    
    dataBody[pair[0]] = pair[1]
  }
  
  if(dataBody.files){
    const files = []
    for(let f of dataBody.files){
      const file = await readFile(f)
      files.push(file)
    }
    dataBody.files = files
  }
  
  const jsonData = {
    action : 'create novedad',
    token : sessionStorage.getItem('soles_webapp_session'),
    data : dataBody
  }

  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }

  btn.disabled = true

  fetch(url,options).then(res => res.json()).then(res => {
    console.log(res)
    btn.disabled = false
    target.textContent = 'Aceptar'
    spinner.classList.add('visually-hidden')
    document.querySelector('#novedades_new_form').reset()
    globalNovedades.novedades.splice(0,0,res.data)
    
    setTableContent(globalNovedades.novedades)
    
  })
  
}

function readFile(file){
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsArrayBuffer(file)
    const arrFileName = file.name.split('.')

    fr.onload = () => {
      const fileReaded = [...new Int8Array(fr.result)]
      resolve({
        file : fileReaded,
        extension : arrFileName[arrFileName.length - 1],
        fileName : file.name
      })
    }
    
  })
}
