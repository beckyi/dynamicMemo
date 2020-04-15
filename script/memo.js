// Drag Functions
function ondragStart (e) {
  console.log('ondragStart', e, this)
}

const ondragOver = e => {
  console.log(
    '!!!',
    this.data,
    $(`#${e.target.id}`).offset(),
    $(`#${e.target.id}`).position()
  )
  console.log('ondragOver', e, this)
  // e.prevent/
  e.preventDefault()
}

const ondragEnd = e => {
  let model = document.getElementById(e.target.id)

  const top = e.pageY + 'px',
    left = e.pageX + 'px'
  // this.style.top = e.offsetX + 'px'
  // this.style.left = e.offsetY + 'px'
  // this.style.top = model.offsetTop + 'px'
  // this.style.left = model.offsetLeft + 'px'
  // this.style.top = e.clientX - model.getBoundingClientRect().top + 'px'
  // this.style.left = e.clientY - model.getBoundingClientRect().left + 'px'
  // this.style.top = e.screenX + 'px'
  // this.style.left = e.screenY + 'px'
  model.style.top = top
  model.style.left = left
  // model.style.top = $(`#${e.target.id}`).offset().top
  // model.style.left = $(`#${e.target.id}`).offset().left

  // IN index.js
  updateStorage('UPDATE', { id: e.target.id, position: { top, left } })
}

const onDeleteClick = (e, who) => {
  // DOM에서 제거
  who.remove()
  // IN index.js
  updateStorage('DELETE', { id: who.id })
}
const onReSizeMemo = (e, who) => {
  console.log('onReSizeMemo !!!', e, who, who.id)
  e.preventDefault()
}

const onBlurTextArea = (e, who) => {
  e.preventDefault()

  // 엔터키 html 태그로 변형하여 저장
  let str = e.srcElement.innerText.split('\n').join('<br/>')
  // IN index.js
  updateStorage('UPDATE', { id: who.id, content: str })
}
