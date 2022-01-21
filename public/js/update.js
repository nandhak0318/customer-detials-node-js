var loadFile = function (event) {
  var image = document.getElementById('output')
  image.src = URL.createObjectURL(event.target.files[0])
}

const url_string = window.location.href
const url = new URL(url_string)
const id = url.searchParams.get('id')
console.log(id)
let tempName

if (!Cookies.get('token')) {
  location.href = '/auth.html'
}
const token = Cookies.get('token')
console.log(token)
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}

const showTask = async () => {
  try {
    const {
      data: { user_detial },
    } = await axios.get(`/detials/${id}`)
    const { name, email, image, totalOrders } = user_detial[0]
    console.log(user_detial)
    document.getElementById('name').placeholder = name
    document.getElementById('email').placeholder = email
    document.getElementById('tno').placeholder = totalOrders
    document.getElementById('output').src = image
  } catch (error) {
    document.getElementById('fail').textContent = error
    console.log(error.response.data)
  }
}

showTask()

sb.addEventListener('click', async (e) => {
  e.preventDefault()
  let error = false

  if (document.getElementById('email').value) {
    if (!ValidateEmail(document.getElementById('email').value)) {
      document.getElementById('fail').textContent =
        'Please enter an valid email address'
      error = true
    }
  }
  if (error == false) {
    const formData = new FormData()
    let name = document.getElementById('name')
    const email = document.getElementById('email')
    const file = document.getElementById('file')
    const totalOrders = document.getElementById('tno')
    if (name) {
      formData.append('name', name.value)
    }
    if (email) {
      formData.append('email', email.value)
    }
    if (file.files[0]) {
      formData.append('image', file.files[0])
    }
    if (totalOrders) {
      formData.append('totalOrders', totalOrders.value)
    }

    axios({
      method: 'put',
      url: `/update/${id}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        document.getElementById('sus').textContent = `user succesfully updated`
        showTask()
      })
      .catch((err) => {
        document.getElementById('fail').textContent = err.response.data.msg
        console.log(err.response.data.msg)
      })
  } else {
    error = false
  }
})
