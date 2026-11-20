import { handleLogin, handleRegister } from "./auth.js";

const loginBtn = document.querySelector('#login-btn')
const loginForm = document.querySelector('#login-form')
const loginDialog = document.querySelector('#login-auth-modal')
const loginDialogClose = document.querySelector('#login-close-btn')
const registerBtn = document.querySelector('#register-btn')
const registerForm = document.querySelector('#register-form')
const registerDialog = document.querySelector('#register-auth-modal')
const registerDialogClose = document.querySelector('#register-close-btn')
const [loginErr, registerErr] = document.querySelectorAll('.err-msg')

loginBtn.addEventListener('click', e => loginDialog.showModal())
loginDialogClose.addEventListener('click', e => {
    loginErr.style.display = 'none'
    loginErr.value = ''
    loginDialog.close()
})

registerBtn.addEventListener('click', e => registerDialog.showModal())
registerDialogClose.addEventListener('click', e => {
    registerErr.style.display = 'none'
    registerErr.value = ''
    registerDialog.close()
})

loginForm.addEventListener('submit', e => {
    try {
        (handleLogin(e) === 0) && loginDialog.close()
    } catch (err) {
        loginErr.textContent = err.message
        loginErr.style.display = 'block'
    }
})

registerForm.addEventListener('submit', e => {
    try {
        (handleRegister(e) === 0) && registerDialog.close()
    } catch (err) {
        registerErr.textContent = err.message
        registerErr.style.display = 'block'
    }
})