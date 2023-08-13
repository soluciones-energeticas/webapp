
import {showComprasSection} from './compras/compras.js'
import { showTesoreriaSection } from './tesoreria/tesoreria.js'
// import { modal } from './scripts.js'

const body = document.querySelector('body .body')

function showLogin(){

  body.innerHTML = `
  <aside id="login_aside" class="">
    <div class="login_bg_div login"></div>
    <form action="#" class="login_form d-flex flex-column p-4 h-100">
      <img id="login_img" class="logo_login_soles align-self-center p-3 mb-auto" src="./assets/logo_soles.png" alt="">
      <h3 class="fw-bold text-center">Inicia sesión!</h3>
      <p id="login_error" class="text-warning-emphasis text-center"></p>
      <div class="mb-3 mt-2">
        <label for="usuario_input" class="form-label">Usuario</label>
        <input type="text" class="form-control" id="usuario_input">
      </div>
      <div class="mb-3">
        <label for="pass_input" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="pass_input">
      </div>
      <button id="login_btn" type="button" class="btn btn-primary mt-3">
        <span id="login_btn_spinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
        <span id="login_btn_text">Iniciar sesión</span>
      </button>
    </form>
  </aside>
    `
  const login_btn = document.querySelector('#login_btn')
  const usuario_input = document.querySelector('#usuario_input')
  const pass_input = document.querySelector('#pass_input')
  
  login_btn.addEventListener('click', e => {
    
    const url = 'https://script.google.com/macros/s/AKfycbwNNT2Cfx9PHB6p9Awm_AdxvcPZwOFp7pAju01aQWAVWF03nKvXcU3ZCPCuB2vKDSCp/exec'
    const jsonData = {
      user : usuario_input.value,
      password : pass_input.value,
      action : 'login',
    }
    
    const options = {
      method: "POST",
      Headers: {"Content-Type": "application/json"},
      body: JSON.stringify(jsonData)
    }
    
    fetch(url,options)
    .then(res => res.json())
    .then(res => {
       if(res.estatus){
        body.innerHTML = ''
        sessionStorage.setItem('soles_webapp_session',res.data.newToken)
        showAppAside(res.data)
        
      }else{
        document.querySelector('#login_error').textContent = 'Usuario y/o contraseña inválidos'
      }
      
    })
    .catch(err => console.log(err))
    
  })
  
  
  
}

function validateAccess(){
  const session = sessionStorage.getItem('soles_webapp_session')
  
  if(!session){
    showLogin()
    return
  }
  
  const url = 'https://script.google.com/macros/s/AKfycbwNNT2Cfx9PHB6p9Awm_AdxvcPZwOFp7pAju01aQWAVWF03nKvXcU3ZCPCuB2vKDSCp/exec'

  const jsonData = {
    action : 'access',
    token : sessionStorage.getItem('soles_webapp_session')
  }
  
  const options = {
    method: "POST",
    Headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }
  
  fetch(url,options)
   .then(res => res.json())
   .then(res => {
     if(res.estatus){
      body.innerHTML = ''
      showAppAside(res.data)
    }else{
      showLogin()
    }
    
  })
  
}

function showAppAside(data_res){
  body.innerHTML = `
  <aside id="app_aside" class="d-flex flex-column text-white flex-shrink-0">
    <div class="login_bg_div"></div>
    <div class="app_bg_div"></div>
    <img id="logo_img" class="mt-auto mx-auto mb-2 p-2" src="./assets/logo_soles.png" alt="">
    <div class="user_info p-2 d-flex align-items-center justify-content-center mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>
      <span class="fs-3 ms-2">Usuario</span>
    </div>
  </aside>
  <main class="flex-grow-1 p-3 m-3 ms-0 rounded-3"></main>`

  if(data_res.secciones_permitidas.includes('compras_section')){
    const newElement = document.createElement('div')
    const container = body.querySelector('#app_aside')
    const element = container.querySelector('#logo_img')
    container.insertBefore(newElement,element)
    
    newElement.outerHTML = `
    <div class="d-flex align-items-center justify-content-center w-100 menu_option mt-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
      </svg>
      <span class="flex-grow-1 ms-3">Compras</span>
    </div>`
    
  }

  if(data_res.secciones_permitidas.includes('tesoreria_section')){
    const newElement = document.createElement('div')
    const container = body.querySelector('#app_aside')
    const element = container.querySelector('#logo_img')
    container.insertBefore(newElement,element)
    
    newElement.outerHTML = `
    <div class="d-flex align-items-center justify-content-center w-100 menu_option mt-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
      </svg>
      <span class="flex-grow-1 ms-3">Tesoreria</span>
    </div>`
    
  }

  document.querySelectorAll('.menu_option').forEach(option => {
    option.addEventListener('click', () => {
      const section = option.querySelector('span').textContent
      document.querySelector('#app_aside').classList.add('active')

      switch(section){
        case 'Compras':
          showComprasSection()
          break
        case 'Tesoreria':
          showTesoreriaSection()
          break
        
      }
      
    })
    
  })

  document.addEventListener('click', e => {
    const target = e.target
    const aside = document.querySelector('#app_aside')
  
    if(!aside.contains(target)){
      aside.classList.remove('active')
    }
    
  })
  
}
  
validateAccess()

