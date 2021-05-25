const form = document.querySelector(".js-form");
const input = form.querySelector("input")
const greeting = document.querySelector(".js-greetings")
// localStorage.setItem("nico", true)

input.className = "name__input";

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); // 이벤트가 금지됨
    const currentValue = input.value;
    paintGreeting(currentValue)
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!!`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    console.log('currentUser', currentUser);
    if (currentUser === null){
        // she is not in  
        askForName();
    }else{
        // she is in
        paintGreeting(currentUser);
    }
}

function init(){
    loadName()
}

init();