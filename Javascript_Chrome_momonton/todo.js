const toDoForm = document.querySelector(".js-toDoForm")
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos= toDos.filter(function(toDo){
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 함.
    // JSON.stringfy는 자바스크립트 object를 string으로 바꿔줌.
}

function paintToDo(text){
    const li = document.createElement("li");
    li.className = "toDo";
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.className = "toDo__button"
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();    // push 한다음에 save하기
    
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        console.log(loadedToDos)
        const parseToDos = JSON.parse(loadedToDos)  // string을 object로 변환
        console.log(parseToDos)
        parseToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();

