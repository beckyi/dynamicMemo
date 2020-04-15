var data = [] // 스토리지에 저장된 정보 (전역변수) ***
let laxtIDX = 0 // ID 구분 값
const storeName = 'memo_data'
// localstorage에서 데이터 가져오기
const lsData = window.localStorage.getItem(storeName)
// 메모장 디폴트 양식
const defForm = {
  id: 'memo0',
  content: '메모하십시오!',
  position: { top: '0px', left: '0px' },
  size: {
    width: '200px',
    height: '100px'
  }
}
// 메모장 element
const makeMemo = (item, idx) => {
  return `<div class="memo" id="memo${idx}" style="top:${item.position
    .top};left:${item.position.left}" draggable="true">
  <div class="header">
      <h1 class="blind">메모장</h1>
      <button class="btn_close" onclick="onDeleteClick(event, memo${idx})"><span class="blind">닫기</span></button>
  </div>
  <div class="content">
      <div class="textarea" contenteditable="true" style="width:${item.size
        .width}; height:${item.size
    .height};" onblur="onBlurTextArea(event, memo${idx})">
        ${item.content}
      </div>
      <button class="btn_size" onclick="onReSizeMemo(event, memo${idx})"><span class="blind">메모장 크기 조절</span></button>
  </div>
</div>`
}
// region :: FUNCTION AREA
const onMouseDown = event => {
  // 우클릭
  if (event.button == 2 || event.which == 3) {
    let pForm = Object.assign({}, defForm)
    // 포커스 기준으로 메모장 위치 선정
    pForm.id = `memo${laxtIDX}`
    pForm.position = {
      top: event.pageY + 'px',
      left: event.pageX + 'px'
    }

    // 메모장 데이터 추가 및 storage 갱신
    updateStorage('ADD', pForm)

    // DOM에 생성
    makeMemoElement(pForm, laxtIDX)

    laxtIDX += 1
  }
}

var updateStorage = (action, pParam) => {
  switch (action) {
    case 'ADD':
      data.push(pParam)
      break
    case 'UPDATE':
    case 'DELETE':
      let id = pParam.hasOwnProperty('id') ? pParam.id : null
      if (id !== null) {
        let where = null
        const _id = pParam.id
        let dataObj = data.find((element, idx) => {
          where = idx
          return element.id === _id
        })

        delete pParam.id
        if (action === 'UPDATE') {
          data[where] = Object.assign({}, dataObj, pParam)
        } else if (action === 'DELETE') data.splice(where, 1)
      }
      break
  }
  console.log('result!!!', data)

  if (typeof data === 'object' && data !== null) {
    // 문자열 형태로 저장합니다.
    window.localStorage.setItem(storeName, JSON.stringify(data))
  }
}

// 메모장 element DOM에 생성
const makeMemoElement = (item, idx = null) => {
  const parent = $('.wrap')

  if (idx === null) {
    idx = item.id.substr(4)
  }

  $(makeMemo(item, idx)).appendTo(parent)

  // 이벤트 핸들러 추가
  let target = document.getElementById(`memo${idx}`)
  target.addEventListener('dragstart', ondragStart)
  target.addEventListener('dragend', ondragEnd)
  target.addEventListener('dragover', ondragOver)
}
// endregion

// 실행할 때 localstorage 데이터 읽어오기
window.onload = function () {
  laxtIDX = 0 // 실행 시 초기화

  // form: 내용, 위치, 크기, 쌓이는 순서 저장
  if ([null, '[]'].includes(lsData)) {
    // 메모장이 없을 경우 디폴트로 하나 그려줍니다.
    data.push(defForm)

    // 저장된 메모장 동적으로 생성
    data.forEach(item => {
      makeMemoElement(item, laxtIDX)
      laxtIDX += 1
    })
  } else if (/[.*]|{.*}/.test(lsData)) {
    data = JSON.parse(lsData)
    // TODO:: laxtIDX ###
    laxtIDX = Number(data[data.length - 1].id.substr(4)) + 1

    // 저장된 메모장 동적으로 생성
    data.forEach(item => {
      makeMemoElement(item)
    })
  }
}
// 마우스 우클릭 이벤트 처리 :: 메모장 생성
document.addEventListener('mousedown', onMouseDown)
