/* Memo element 관련 Functions */
const ondragOver = e => {
  // 이벤트 막아줍니다.
  e.preventDefault()
}
// 드래그할 경우 위치 이동
const ondragEnd = e => {
  const top = e.pageY + 'px',
    left = e.pageX + 'px'

  let model = document.getElementById(e.target.id)
  model.style.top = top
  model.style.left = left

  // IN index.js
  updateStorage('UPDATE', { id: e.target.id, position: { top, left } })
}
// 닫기 버튼 클릭 시 삭제
const onDeleteClick = (e, who) => {
  // DOM에서 제거
  who.remove()
  // IN index.js
  updateStorage('DELETE', { id: who.id })
}
// 메모장 내용 재저장
const onBlurTextArea = (e, who) => {
  e.preventDefault()

  // 엔터키 html 태그로 변형하여 저장
  let str = e.srcElement.innerText.split('\n').join('<br/>')
  // IN index.js
  updateStorage('UPDATE', { id: who.id, content: str })
}
// 메모장 사이즈 변경 이벤트
const onReSizeMemo = (e, who) => {
  console.log('onReSizeMemo !!!', e, who, who.id)
  who.draggable = false
  // updateStorage('UPDATE', { id: who.id, size: {width, height} })
}
const onReSizeMemo2 = (e, who) => {
  console.log('onReSizeMemo2 !!!', e, who, who.id)
  who.draggable = true
  // updateStorage('UPDATE', { id: who.id, size: {width, height} })
}
