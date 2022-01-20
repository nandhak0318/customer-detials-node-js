const token = Cookies.get('token')
if (token) {
  location.href = '/'
}

$('.message a').click(function () {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow')
})

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}

const login = document.getElementById('login')
const signup = document.getElementById('signup')
const lemail = document.getElementById('lemail')
const lpass = document.getElementById('lpass')
const lerror = document.getElementById('lerror')
const serror = document.getElementById('serror')
const sname = document.getElementById('sname')
const semail = document.getElementById('semail')
const spass = document.getElementById('spass')
const file = document.getElementById('file')
login.addEventListener('click', (e) => {
  e.preventDefault()
  let error = false
  if (lpass.value.length < 4) {
    lerror.textContent = 'please enter an valid password'
    error = true
  }
  if (!ValidateEmail(lemail.value)) {
    lerror.textContent = 'Please enter an valid email address'
    error = true
  }

  if (lemail.value == '' || lpass.value == '') {
    lerror.textContent = 'Please fill all the fields'
    error = true
  }
  if (error == false) {
    let email = lemail.value
    let password = lpass.value
    axios({
      method: 'post',
      url: '/login',
      data: { email, password },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        const token = response.data.token
        Cookies.set('token', token, { sameSite: 'strict', expires: 8 })
        location.href = '/'
      })
      .catch((err) => {
        console.log(err.response.data)
        lerror.textContent = `something went wrong`
        if (err.response.data.msg) {
          lerror.textContent = err.response.data.msg
        }
      })
  } else {
    error = false
  }
})

signup.addEventListener('click', (e) => {
  e.preventDefault()
  let error = false
  if (spass.value.length < 4) {
    serror.textContent = 'please enter an valid password'
    error = true
  }
  if (!ValidateEmail(semail.value)) {
    serror.textContent = 'Please enter an valid email address'
    error = true
  }

  if (semail.value == '' || spass.value == '' || sname == '') {
    serror.textContent = 'Please fill all the fields'
    error = true
  }
  if (file.files.length === 0) {
    serror.textContent = 'Please upload a image'
    error = true
  }
  if (error == false) {
    const formData = new FormData()
    formData.append('name', sname.value)
    formData.append('email', semail.value)
    formData.append('password', spass.value)
    formData.append('image', file.files[0])

    axios({
      method: 'post',
      url: '/register',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        const token = response.data.token
        Cookies.set('token', token, { sameSite: 'strict', expires: 8 })
        location.href = '/'
      })
      .catch((err) => {
        console.log(err.response.data)
        serror.textContent = `something went wrong`
        if (err.response.data.msg) {
          serror.textContent = err.response.data.msg
        }
      })
  } else {
    error = false
  }
})

var loadFile = function (event) {
  var image = document.getElementById('output')
  image.src = URL.createObjectURL(event.target.files[0])
}
