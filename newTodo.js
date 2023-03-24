

let elementId = 0;
let currentlyVisible; // 1 - all; 2 - active; 3 - completed

const button = document.querySelector(".todo-main-view-button");
const input = document.querySelector(".todo-main-view-input");

const container = document.querySelector('.container')

const ul = document.createElement("ul");
ul.classList.add("new-list");
const section = document.querySelector(".add-elements");
section.append(ul);

let list = [];

//Сохранение листа
loadList()

function saveList() {
    let savedState = {
        listArray: list,
        currentTab: currentlyVisible,
    }
    if (list.length > 0) {
        localStorage.setItem('state', JSON.stringify(savedState))
    } else
        localStorage.setItem('state', '');
    console.log("Hello");
}

function loadList() {
    let savedState;
    if (localStorage.getItem('state')) {
        savedState = JSON.parse(localStorage.getItem('state'))
        list = savedState.listArray;
        currentlyVisible = savedState.currentTab;
        if (list.length > 0) {
            refreshList()
            addFooter()
            refreshFooter()
            switch(currentlyVisible) {
                case 1: document.querySelector('.l-w-e-a-all').classList.add('typeButt')
                break;
                case 2: document.querySelector('.l-w-e-a-action').classList.add('typeButt')
                break;
                case 3: document.querySelector('.l-w-e-a-action').classList.add('typeButt')
                break;
            }
        }
    }
}



const onKeyDown = (event) => {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        event.preventDefault();
        addInArray();
    }
};
// Делам вывод с помощью кноппки enter
input.addEventListener("keydown", onKeyDown);

// Добавить в массив
const addInArray = () => {
    let text = input.value;
    if (text == 0) {
        return "";
    }
    list.push({ id: elementId++, text, isComplete: false });
    input.value = "";
    refreshList();
    if (list.length === 1) {
        addFooter();
    }
    refreshFooter();
};

// Удаление элемента по id
function deleteElement(id) {
    list = list.filter((el) => id !== el.id);
    refreshList();
    refreshFooter();
    if (list.length === 0) {
        removeFooter();
    }
}

// Изнменение элемента по  isCompleted

function changeCompletion(id) {
    let element = list.find((el) => id === el.id); //.isComplete = isComplete;
    element.isComplete = !element.isComplete;
}


// Общая кнопка сворачивания 
function addArrow() {
// inpArrow.classList.add('checkArrow')
container.append(inpArrow)
inpArrow.setAttribute('class', 'checkArrow')
list = list.map(el=> el.isComplete = true)
}


// Обновление списка
function refreshList() {
    ul.innerHTML = "";
    let elements = [];
    for (let el of list) {
        if (currentlyVisible === 2 && el.isComplete) {
            console.log("here");
            continue;
        } else if (currentlyVisible === 3 && !el.isComplete) {
            continue;
        }
        const li = document.createElement("li");
        li.classList.add("new-list-li");
        const nllDiv = document.createElement("div");
        nllDiv.classList.add("new-list-li-div");
        const nllSpan = document.createElement("span");
        nllSpan.classList.add("new-list-li-span");
        nllSpan.textContent = el.text;
        const img = document.createElement('img')
        img.classList.add('krasivo')
        nllSpan.setAttribute("src", el.isComplete ?   nllSpan.classList.add('cross-out') :  nllSpan.classList.remove('cross-out') )
        img.setAttribute("src", el.isComplete ?  "checkbox-on.png" : "checkbox-off.png" )
        img.addEventListener('click', (e)=> {
        el.isComplete = !el.isComplete  
        e.target.setAttribute('src',  el.isComplete ?  "checkbox-on.png" : "checkbox-off.png")
        refreshFooter() 
        refreshList()
       })
        const nllButton = document.createElement("button");
        nllButton.classList.add("new-list-li-button");

        nllButton.addEventListener("click", () => {
            deleteElement(el.id);
            //controller.abort();
        });
            //,{ signal: controller.signal });

        li.append(nllDiv);
        nllDiv.append(nllSpan, img, nllButton);
        elements.push(li);
    }
    elements.forEach((el) => {
        ul.append(el);
    });
    section.append(ul);
    saveList()
}

function addFooter() {
    const divLowElements = document.createElement("div");
    divLowElements.classList.add("low-elements-action");

    const divSpan = document.createElement("div");
    divSpan.classList.add("low-elements-span");

    const sp1 = document.createElement("span");
    sp1.classList.add("l-e-actionspan-first");
    sp1.innerHTML = "";

    const sp2 = document.createElement("span");
    sp2.classList.add("l-e-actionspan-second");
    sp2.innerHTML = "";

    const sp3 = document.createElement("span");
    sp3.classList.add("l-e-actionspan-third");
    sp3.innerHTML = " left";

    const divButton = document.createElement("div");
    divButton.classList.add("low-elements-action-button");

    const bt1 = document.createElement("button");
    bt1.classList.add("l-w-e-a-all", 'ttt');
    bt1.innerHTML = "All";
    bt1.addEventListener("click", () => {
        currentlyVisible = 1;
        refreshList();
    });

    const bt2 = document.createElement("button");
    bt2.classList.add("l-w-e-a-action", 'ttt');
    bt2.innerHTML = "Active";
    bt2.addEventListener("click", () => {
        currentlyVisible = 2;
        refreshList();
    });

    const bt3 = document.createElement("button");
    bt3.classList.add("l-w-e-a-completed", 'ttt');
    bt3.innerHTML = "Completed";
    bt3.addEventListener("click", () => {
        currentlyVisible = 3;
        refreshList();
    });
 
    const clearAll = document.createElement("label");
    clearAll.classList.add("low-elements-action-clear");
    clearAll.innerHTML = "Clear Completed";
    
    clearAll.addEventListener("click", () => {
        list = list.filter((el) => !el.isComplete);
        if (list.length == 0) {
            removeFooter()
        // } else {
        //     refreshFooter();
        }
        refreshList();
        })
        
    divSpan.append(sp1, sp2, sp3);
    divButton.append(bt1, bt2, bt3);
    divLowElements.append(divSpan, divButton,clearAll);


    // if(list.find(el=>el.isComplete == true)) {
    //     console.log('YES')
    //     divLowElements.append(clearAll)
    // } else if() {

    // }
    const footer = document.querySelector(".low-elements");
    footer.prepend(divLowElements);

    let menuItems = document.querySelectorAll('.ttt')
    let onClick = function (event) {
        event.preventDefault()
    
    for(let i = 0; i < menuItems.length; i++){
          menuItems[i].classList.remove('typeButt'); //убираем класс
      }
      event.currentTarget.classList.add('typeButt')
    }

    for(let i = 0; i < menuItems.length; i++){
       menuItems[i].addEventListener('click', onClick)
    }
    
}



function removeFooter() {
    const footer = document.querySelector(".low-elements");
    footer.firstChild.remove();
}

function refreshFooter() {
    let leftLength = list.filter((el) => el.isComplete === false).length;
    const sp1 = document.querySelector(".l-e-actionspan-first");
    sp1.innerHTML = leftLength;

    const sp2 = document.querySelector(".l-e-actionspan-second");
    sp2.innerHTML = leftLength == 1 ? " item" : " items";
}




