$(document).foundation()

const megaroster = {
  students: [],

  init(listSelector) {
    this.studentList = document.querySelector(listSelector)
    this.max = 0
    this.setupEventListeners()  
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudent.bind(this))
  },

  removeStudent(ev) {
    const btn = ev.target
    btn.closest('.student').remove()


    // Remove it from the this.students array
    // this.students.splice(?, 1)
    const id = parseInt(btn.parentElement.parentElement.dataset.id)
    for(let i = 0; i < megaroster.students.length; i++){
      if(megaroster.students[i].id === id){
        megaroster.students.splice(i, 1)
        break
      }
    }


  },

  promoteStudent(ev) {
    const btn = ev.target
    const li = btn.parentElement.parentElement
    li.style.padding = "3px 3px 3px 5px"
    //listing.style.width = listing.textContent.length * 8 + "px"
    li.style.borderStyle = "solid"
    li.style.borderColor = "#000"
    li.style.borderWidth = "4px"
    li.style.backgroundColor = "#9eddff"
    li.style.margin = "5px 0px 5px 0px"
    li.style.fontWeight = "bold"
  },

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)

    this.max ++
    f.reset()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    this.removeClassName(li, 'template')
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))

    li
      .querySelector('button.promote')
      .addEventListener('click', this.promoteStudent.bind(this))
    return li
  },

  removeClassName(el, className){
    el.className = el.className.replace(className, '').trim()
  }
}
megaroster.init('#studentList')
