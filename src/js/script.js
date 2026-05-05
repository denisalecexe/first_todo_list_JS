// 1. VARIABILI
// variabili costanti per inizializzare gli elementi su cui lavorare
// input text area
const todoInputArea = document.getElementById("todo-input-area"); // per la sezione di input dove mettere il testo della todo list
const shopInputArea = document.getElementById("shop-input-area"); // per la sezione di input dove mettere il testo della shop list

// button
const btnAddTodo = document.getElementById("btn-add-todo"); // per il tasto add todo
const btnRemoveTodo = document.getElementById("btn-remove-todo"); // per il tasto remove todo
const btnAddShop = document.getElementById("btn-add-shop"); // per il taso add shop
const btnRemoveShop = document.getElementById("btn-remove-shop"); // per il tasto remove shop

// list
const todoList = document.querySelector(".todo-list"); // per la lista to do
const shopList = document.querySelector(".shopping-list"); // per la lista shopping

// variabili per i bottoni del dropdown
// zona TODO
const iconTodo = document.querySelector(".arrow-menu-todo");
const dropdownTodo = document.getElementById("btn-toggle-todo"); // il "boss" che fa girare la freccia
const listTodo = document.getElementsByClassName("completed-list")[0]; // il contenuto che deve far apparire la lista
// zona SHOP
const iconShop = document.querySelector(".arrow-menu-shop");
const dropdownShop = document.getElementById("btn-toggle-shop");//il "boss" che fa girare la freccia
const listShop = document.getElementsByClassName("completed-list")[1];  // il contenuto che far deve apparire la lista

// array che che conterrà ke task nella memoria grazie al localStorage
let permanentTask = [];
let savedData = localStorage.getItem("tasks");
// recupera i dati salvati e li traforma da stringa ad array e se il magazzino è vuoto, inizializza un array vuoto
permanentTask = JSON.parse(savedData) || [];
console.log("Test: ", savedData); // mostra nella console i dati salvati nelle task

// ciclo forEach che mantiene la memoria della lista anche al ricaricamento della pagina
permanentTask.forEach(task => {
    // CREARE GLI ELEMENTI
    // crea gli li
    const li = document.createElement("li");
    // creare il checkbox
    const check = document.createElement("input");
    check.type = "checkbox";
    // creare lo span
    const span = document.createElement("span");
    // crea l'icona per il trash
    const iconTrash = document.createElement("i");
    // crea l'icona di edit
    const editTask = document.createElement("i");

    // ASSEGNARE I VALORI
    span.innerText = task.testo; // questo prende il testo dell'oggetto salvato
    iconTrash.classList.add("bi", "bi-trash-fill", "btn-delete");
    editTask.classList.add("bi", "bi-pencil-square", "btn-edit");

    // AGGIUNGE LO STILE SE LA TASK ERA COMPLETATA
    if(task.completata) {
        li.classList.add("completed");
        check.checked = true;
    }

    // stessa addEventListener sul checkbox che si trova nelle funzioni add per far continuare a render il checkbox interattivo
    check.addEventListener('change', function() {
        if(check.checked) {
            li.classList.add("completed"); 
            task.completata = true; // questo aggiorna lo stato nell'oggetto
            setTimeout(() => {
                if(task.categoria === "todo") {
                    listTodo.appendChild(li);
                } else {
                    listShop.appendChild(li);
                }
            }, 300);
        } else {
            li.classList.remove("completed");
            task.completata = false; // questo aggiorna lo stato nell'oggetto
            if(task.categoria === "todo") {
                todoList.appendChild(li);
            } else {
                shopList.appendChild(li);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(permanentTask)); // Salva la modifica
    });

    // evento per rendere funzionante l'icona del trash anche al ricaricamento
    iconTrash.addEventListener('click', () => {
        li.remove();
        permanentTask = permanentTask.filter(t => t.testo !== task.testo);
        localStorage.setItem("tasks", JSON.stringify(permanentTask));
    });

    // ASSEMBLA IL TASK
    li.appendChild(iconTrash); // icona del trash
    li.appendChild(check); // checkbox
    li.appendChild(span); // testo
    li.appendChild(editTask); // icona dell'edit task 

    // DIREZIONA IL TASK IN TODO LISTO O SHOPPING LIST
    // correzione: se è completata, deve andare nel menu a tendina (listTodo/listShop), non nella lista principale
    if (task.completata) {
        if (task.categoria === "todo") {
            listTodo.appendChild(li);
        } else {
            listShop.appendChild(li);
        }
    } else {
        if (task.categoria === "todo") {
            todoList.appendChild(li);
        } else {
            shopList.appendChild(li);
        }
    }
});

// 2. FUNZIONI
// funzione che aggiunge una task alla todo
function addToDoTask() {
    // inzializzazione e accesso all'elemento input HTML per l'input todo
    const todoArea = todoInputArea.value;

    //if statement per creare nuove task (li + span + checkbox + testo) in todo
    if (todoArea !== "") {
        // 1. CREAZIONE ELEMENTI
        // crea un nuovo elemento li
        const newTask = document.createElement("li");
        // crea l'icona per il trash
        const iconTrash = document.createElement("i");
        // crea il checkbox
        const checkbox = document.createElement("input");
        // crea lo span per il testo della nuova task ed è l'etichetta
        const taskText = document.createElement("span");
        // crea l'icona di edit
        const editTask = document.createElement("i");
        
        // 2. CONFIGURAZIONE CHECKBOX E TESTO
        // serve per il browser per l'icona del trash
        iconTrash.classList.add("bi", "bi-trash-fill", "btn-delete");
        // serve per il browser a definire l'identità dell'elemento
        checkbox.type = "checkbox";
        // questo mette il testo nell'etichetta
        taskText.innerText = todoArea;
        // serve per il browser per l'icona dell'edit
        editTask.classList.add("bi", "bi-pencil-square", "btn-edit");

        // 5. MEMORIZZARE I DATI (Spostato qui per poterlo aggiornare nel checkbox)
        const newTodoTaskObj = {
            testo: todoArea,
            categoria: "todo",
            completata: false,
        };

        // evento per rendere funzionante l'icona del trash
        iconTrash.addEventListener('click', () => {
            newTask.remove();
            permanentTask = permanentTask.filter(task => task.testo !== todoArea);
            localStorage.setItem("tasks", JSON.stringify(permanentTask));
        });

        // funzione per migliorare e decorare il checkbox in todo
        checkbox.addEventListener('change', function() {
            if(checkbox.checked) {
                newTask.classList.add("completed");
                newTodoTaskObj.completata = true; // aggiorna l'oggetto
                setTimeout(() => {
                    listTodo.appendChild(newTask);
                }, 300);
            } else {
                newTask.classList.remove("completed");
                newTodoTaskObj.completata = false; // aggiorna l'oggetto
                todoList.appendChild(newTask);
            }
            localStorage.setItem("tasks", JSON.stringify(permanentTask)); // Salva lo stato
        });

        // 3. ASSEMBLAGGIO 
        newTask.appendChild(iconTrash); 
        newTask.appendChild(checkbox); 
        newTask.appendChild(taskText); 
        newTask.appendChild(editTask); 
        todoList.appendChild(newTask); 

        // 4. PUBBLICAZIONE
        todoInputArea.value = ""; 
        
        permanentTask.push(newTodoTaskObj);
        localStorage.setItem("tasks", JSON.stringify(permanentTask));
    } else {
        alert("Non hai scritto nessuna task da completare.")
    } 
}

// funzione che aggiunge una stask alla shopping list
function addShopTask() {
    // inizializzazione e accesso all'elemento input HTML per l'input shop
    const shopArea = shopInputArea.value;

    if(shopArea !== "") {
        const newShop = document.createElement("li");
        const iconTrash = document.createElement("i");
        const checkbox = document.createElement("input");
        const shopText = document.createElement("span");
        const editTask = document.createElement("i");

        iconTrash.classList.add("bi", "bi-trash-fill", "btn-delete");
        checkbox.type = "checkbox";
        shopText.innerText = shopArea;
        editTask.classList.add("bi", "bi-pencil-square", "btn-edit");

        const newShopTaskObj = {
            testo: shopArea,
            categoria: "shopping",
            completata: false,
        };

        iconTrash.addEventListener('click', () => {
            newShop.remove();
            permanentTask = permanentTask.filter(task => task.testo !== shopArea);
            localStorage.setItem("tasks", JSON.stringify(permanentTask));
        });

        checkbox.addEventListener('change', function() {
            if(checkbox.checked) {
                newShop.classList.add("completed");
                newShopTaskObj.completata = true;
                setTimeout(() => {
                    listShop.appendChild(newShop);
                }, 300);
            } else {
                newShop.classList.remove("completed");
                newShopTaskObj.completata = false;
                shopList.appendChild(newShop);
            }
            localStorage.setItem("tasks", JSON.stringify(permanentTask));
        });

        newShop.appendChild(iconTrash); 
        newShop.appendChild(checkbox); 
        newShop.appendChild(shopText); 
        newShop.appendChild(editTask); 
        shopList.appendChild(newShop); 

        shopInputArea.value = ""; 
        
        permanentTask.push(newShopTaskObj);
        localStorage.setItem("tasks", JSON.stringify(permanentTask));
    } else {
        alert("Non hai inserito nessun elemento da dover comprare.")
    };
}

// funzione che rimuove il testo dall'input to do list
function clearTodoInput() {
    const clearTodo = todoInputArea.value;
    if (clearTodo !== "") {
        todoInputArea.value = "";
    } else {
        alert("Non c'è niente da rimuovere nel campo.");
    }
}

// funzione che rimuove il testo dall'input shopping list
function clearShopInput() {
    const clearShop = shopInputArea.value;
    if(clearShop !== "") {
        shopInputArea.value = "";
    } else {
        alert("Non c'è niente da rimuovere nel campo.");
    }
}

// 3. GLI EVENTI PER TODO E SHOP
btnAddTodo.addEventListener('click', addToDoTask);
btnRemoveTodo.addEventListener('click', clearTodoInput);
btnAddShop.addEventListener('click', addShopTask);
btnRemoveShop.addEventListener('click', clearShopInput);

todoInputArea.addEventListener('keydown', (e_add_todo) => {
    if (e_add_todo.key === "Enter") addToDoTask();
})

todoInputArea.addEventListener('keydown', (e_clear_todo) => {
    if (e_clear_todo.key === "Escape") clearTodoInput();
})

shopInputArea.addEventListener('keydown', (e_add_shop) => {
    if (e_add_shop.key === "Enter") addShopTask();
})

shopInputArea.addEventListener('keydown', (e_clear_shop) => {
    if (e_clear_shop.key === "Escape") clearShopInput();
})

// eventi per rendere dinamici i bottoni dei menu di todo list e shopping list delle task completate
/* TODO */
dropdownTodo.addEventListener('click', function() {
    iconTodo.classList.toggle("rotated");
    listTodo.classList.toggle("show");
})

/* SHOP */
dropdownShop.addEventListener('click', function() {
    iconShop.classList.toggle("rotated");
    listShop.classList.toggle("show");
})

/* CHIUSURA AUTOMATICA CLICK FUORI */
document.addEventListener('click', (event) => {
    if (!listTodo.contains(event.target) && !dropdownTodo.contains(event.target)) {
        listTodo.classList.remove("show");
        iconTodo.classList.remove("rotated");
    }
    if (!listShop.contains(event.target) && !dropdownShop.contains(event.target)) {
        listShop.classList.remove("show");
        iconShop.classList.remove("rotated");
    }
})

// TEST PER VEDERE SE IL CODICE JS FUNZIONA
console.log("Sistema pronto e sincronizzato.");