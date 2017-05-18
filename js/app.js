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

  //run this on reload
  load(){
    const rosterString = localStorage.getItem('roster')
    const rosterArray = JSON.parse(rosterString)
    //rosterArray.reverse().map(this.addStudent.bind(this))
    
    const max = JSON.parse(localStorage.getItem('max'))
    this.max = max

    alert()

    
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

    localStorage.setItem('roster', JSON.stringify(this.students))
    localStorage.setItem('max', JSON.stringify(this.max))
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

    const id = parseInt(li.dataset.id) 
    let stud
    for(let i = 0; i < megaroster.students.length; i++){
      if(id === megaroster.students[i].id){
        stud = megaroster.students[i]
        break
      }
    }
    stud.promoted = 1

  },

  moveUp(ev) {
    const btn = ev.target 
    const id = parseInt(btn.parentElement.parentElement.dataset.id)
    if(id === megaroster.students[0].id){
      return;
    }
    const li = btn.closest('.student')
    let stud
    let xx
    for(let i = 0; i < megaroster.students.length; i++){
      if(id === megaroster.students[i].id){
        stud = megaroster.students[i]
        xx = megaroster.students[i-1]
        break
      }
    }

    const newLi = megaroster.buildListItem(stud)
    li.parentElement.insertBefore(newLi, li.previousElementSibling)
    li.remove()

    //rearrange students array
    for(let i = 0; i < megaroster.students.length; i++){
      if(id === megaroster.students[i].id){
        const tempId = megaroster.students[i].id
        const tempName = megaroster.students[i].name
        const tempProm = megaroster.students[i].promoted
        megaroster.students[i].id = megaroster.students[i-1].id
        megaroster.students[i].name = megaroster.students[i-1].name
        megaroster.students[i].promoted = megaroster.students[i-1].promoted
        megaroster.students[i-1].id = tempId
        megaroster.students[i-1].name = tempName
        megaroster.students[i-1].promoted = tempProm
        break
      }
    }
    
    if(xx.promoted === 1){
      newLi.style.padding = "3px 3px 3px 5px"
      newLi.style.borderStyle = "solid"
      newLi.style.borderColor = "#000"
      newLi.style.borderWidth = "4px"
      newLi.style.backgroundColor = "#9eddff"
      newLi.style.margin = "5px 0px 5px 0px"
      newLi.style.fontWeight = "bold"
    }

    localStorage.setItem('roster', JSON.stringify(this.students))
    localStorage.setItem('max', JSON.stringify(this.max))

  },

  moveDown(ev) {
    const btn = ev.target
    const id = parseInt(btn.parentElement.parentElement.dataset.id)
    if(id === megaroster.students[megaroster.students.length - 1].id){
      return;
    }
    const li = btn.closest('.student')
    let stud
    let xx
    for(let i = 0; i < megaroster.students.length; i++){
      if(id === megaroster.students[i].id){
        stud = megaroster.students[i]
        xx = megaroster.students[i+1]
        break
      }
    }
    const newLi = megaroster.buildListItem(stud)
    li.parentElement.insertBefore(newLi, li.nextElementSibling.nextElementSibling)
    li.remove()

    //rearrange students array
    for(let j = 0; j < megaroster.students.length; j++){
      if(id === megaroster.students[j].id){
        const tempId = megaroster.students[j].id
        const tempName = megaroster.students[j].name
        const tempProm = megaroster.students[j].promoted
        megaroster.students[j].id = megaroster.students[j+1].id
        megaroster.students[j].name = megaroster.students[j+1].name
        megaroster.students[j].promoted = megaroster.students[j+1].promoted
        megaroster.students[j+1].id = tempId
        megaroster.students[j+1].name = tempName
        megaroster.students[j+1].promoted = tempProm
        break
      }
    }    

    if(xx.promoted === 1){
      newLi.style.padding = "3px 3px 3px 5px"
      newLi.style.borderStyle = "solid"
      newLi.style.borderColor = "#000"
      newLi.style.borderWidth = "4px"
      newLi.style.backgroundColor = "#9eddff"
      newLi.style.margin = "5px 0px 5px 0px"
      newLi.style.fontWeight = "bold"
    }

    localStorage.setItem('roster', JSON.stringify(this.students))
    localStorage.setItem('max', JSON.stringify(this.max))
  },

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
      promoted: 0,
    }
    this.students.unshift(student)
    localStorage.setItem('roster', JSON.stringify(this.students))

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)

    this.max++
    localStorage.setItem('max', JSON.stringify(this.max))
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
      .querySelector('button.moveup')
      .addEventListener('click', this.moveUp.bind(this))

    li
      .querySelector('button.movedown')
      .addEventListener('click', this.moveDown.bind(this))

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