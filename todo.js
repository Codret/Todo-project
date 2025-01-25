const myInput = document.querySelector("#myInput");
const addTodo = document.querySelector(".addTodo");
const mainTodoElem = document.querySelector(".todo-lists-elem");



const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTodoList"));
};

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement = (currElem) => {
    let divElement = document.createElement("div")
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${currElem}</li> 
    <button class="deleteBtn">Delete</button>`
    mainTodoElem.append(divElement);
};

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoList));
    };

let handleTodo = (e) => {
    e.preventDefault();
    const todoListValue = myInput.value.trim();
    myInput.value = "";
    
    if(todoListValue !== "" && !localTodoList.includes(todoListValue)){
        localTodoList.push(todoListValue);
        localTodoList = [...new Set (localTodoList)];
        console.log(localTodoList);
        localStorage.setItem("youtubeTodoList",JSON.stringify(localTodoList));

        addTodoDynamicElement(todoListValue);
    };
};

const showTodoList = () => {
    console .log(localTodoList);
    localTodoList.forEach((currElem) => {
        addTodoDynamicElement(currElem);
    })
};

showTodoList();

const removeTodoElem = (e) => {
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListContent);

    localTodoList = localTodoList.filter((currTodo) => {
        return currTodo !== todoListContent.toLowerCase();
    });

    addTodoListLocalStorage(localTodoList);
    parentElem.remove();
    console.log(localTodoList);  
}

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.classList.contains("deleteBtn"));
    if (e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
    }
});

addTodo.addEventListener("click", handleTodo);