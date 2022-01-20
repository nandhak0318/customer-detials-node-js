const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')

const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { customers },
    } = await axios.get('/customers')
    if (customers.length < 1) {
      tasksDOM.innerHTML =
        '<h5 class="empty-list">No customers in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allCustomers = customers
      .map((task) => {
        const { name, email, image, totalOrders, id } = task
        return `<div class="single-task">
        <div class="left">
<img src="${image}" width="100px" class="profile-picture centered">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<h5><span><i class="far fa-check-circle"></i></span>${email}</h5>
<h5><span><i class="far fa-check-circle"></i></span>${totalOrders}</h5>
</div>
<div class="task-links">

<!-- edit link -->
<a href="customer.html?id=${id}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${id}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allCustomers
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
    console.log(error)
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/delete/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

document.getElementById('logout').addEventListener('click', (e) => {
  Cookies.remove('token')
  location.href = '/auth.html'
})

document.getElementById('ins').addEventListener('click', () => {
  location.href = '/insert_user.html'
})
