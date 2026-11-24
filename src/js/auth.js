export function initAuth() {

    const users = JSON.parse(localStorage.getItem('users'))
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
            handleLogin(e)
        } catch (err) {
            loginErr.textContent = err.message
            loginErr.style.display = 'block'
        }
    })

    registerForm.addEventListener('submit', e => {
        try {
            handleRegister(e)
        } catch (err) {
            registerErr.textContent = err.message
            registerErr.style.display = 'block'
        }
    })

    function handleLogin(e) {
        e.preventDefault()
        const [username, password] = e.target
        if (!username.value.trim() || !password.value)
            throw new Error('Fields cannot be empty!')
        else {
            const userIndex = users ? users.findIndex(user => user.username === username.value) : -1
            if (userIndex === -1)
                throw new Error("user doesn't exist")
            else {
                if (users[userIndex].password === password.value) {
                    sessionStorage.setItem('user_session', JSON.stringify(
                        {
                            user: username.value
                        }
                    ))
                    window.location.replace('./pages/dashboard.html')
                } else
                    throw new Error('Invalid credentials')
            }
        }
    }


    function handleRegister(e) {
        e.preventDefault()
        const [firstname, lastname, username, password] = e.target
        if (!firstname.value || !lastname.value || !username.value || !password.value)
            throw new Error('Fields cannot be empty!')
        else if (!/^[a-z]+$/i.test(firstname.value) || !/^[a-z]+$/i.test(lastname.value))
            throw new Error('first and last name can only contain letters (a-z)')
        else if (!/^[a-zA-Z0-9._]{3,20}$/.test(username.value))
            throw new Error('username is invalid')
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password.value))
            throw new Error('password must contain 1 uppercase, 1 lowercase, 1 digit')
        else {
            if (!users) {
                localStorage.setItem('users', JSON.stringify(
                    [{
                        firstname: firstname.value,
                        lastname: lastname.value,
                        username: username.value,
                        password: password.value
                    }]
                ))
            } else {
                if (users.some(user => user.username === username.value))
                    throw new Error('username already taken')
                localStorage.setItem('users', JSON.stringify(
                    [...users, {
                        firstname: firstname.value,
                        lastname: lastname.value,
                        username: username.value,
                        password: password.value
                    }]
                ))
                sessionStorage.setItem('user_session', JSON.stringify(
                    {
                        user: username.value
                    }
                ))
                window.location.replace('./pages/dashboard.html')
            }
        }
    }
}