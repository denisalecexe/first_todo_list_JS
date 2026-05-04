// 1. VARIABILI (il magazzino)
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

    // ASSEGNARE I VALORI
    span.innerText = task.testo; // questo prende il testo dell'oggetto salvato

    // AGGIUNGE LO STILE SE LA TASK ERA COMPLETATA
    if(task.completata) {
        li.classList.add("completed");
        check.checked = true;
    }

    // stessa addEventListener sul checkbox che si trova nelle funzioni add per far continuare a render il checkbox interattivo
    check.addEventListener('change', function() {
        if(check.checked) {
            li.classList.add("completed"); 
        } else {
            li.classList.remove("completed");
        }
    });

    // ASSEMBLA IL TASK
    li.appendChild(check);
    li.appendChild(span);

    // DIREZIONA IL TASK IN TODO LISTO O SHOPPING LIST
    if (task.categoria === "todo") {
        todoList.appendChild(li);
    } else {
        shopList.appendChild(li);
    }
});

// 2. FUNZIONI (la logica - la "ricetta")
// funzione che aggiunge una task alla todo
function addToDoTask() {
    // inzializzazione e accesso all'elemento input HTML per l'input todo
    const todoArea = todoInputArea.value;

    //if statement per creare nuove task (li + span + checkbox + testo) in todo
    if (todoArea !== "") {
        // 1. CREAZIONE ELEMENTI
        // crea un nuovo elemento li
        const newTask = document.createElement("li");
        // crea il checkbox
        const checkbox = document.createElement("input");
        // crea lo span per il testo della nuova task ed è l'etichetta
        const taskText = document.createElement("span");
        
        // 2. CONFIGURAZIONE CHECKBOX E TESTO
        // serve per il browser a definire l'identità dell'elemento
        checkbox.type = "checkbox";
        // questo mette il testo nell'etichetta
        taskText.innerText = todoArea;

        // funzione per migliorare e decorare il checkbox in todo
        checkbox.addEventListener('change', function() {
            // id statement usata per far capire se i checkbox sono stati cliccati o meno e hanno il loro stile
            if(checkbox.checked) {
                newTask.classList.add("completed"); // aggiunge lo style della classe .completed CSS

                /* aspettare almeno 300ms (il tempo di un'animazione CSS) prima di spostarlo 
                e setTimeout fa proprio questo */
                setTimeout(() => {
                    // lo sposta nella lista delle task completate (listTodo)
                    listTodo.appendChild(newTask);
                }, 300);
            } else {
                newTask.classList.remove("completed"); // rimuove lo style della classe .completed CSS

                // questo farà in modo che se si deseleziona la task, la si riporta nella lista principale
                todoList.appendChild(newTask);
            }
        });

        // 3. ASSEMBLAGGIO (Prima i pezzi piccoli, poi il pezzo grosso nel DOM)
        newTask.appendChild(checkbox); // mostra il checkbox todo
        newTask.appendChild(taskText); // si aggiunge l'etichetta all'elemento li in todo
        todoList.appendChild(newTask); // mostra nella lista il nuovo elemento in todo

        // 4. PUBBLICAZIONE
        todoInputArea.value = ""; // pulisce l'input del box HTML del todo
        
        // 5. MEMORIZZARE I DATI
        // oggetto che poi verrà inserito nell'aray permanentTask
        const newTodoTaskObj = {
            testo: todoArea,
            categoria: "todo",
            completata: false,
        };

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

    //if statement per creare nuove task (li + span + checkbox + testo) in shop
    if(shopArea !== "") {
        // 1. CREAZIONE ELEMENTI
        // crea un nuovo elemento li
        const newShop = document.createElement("li");
        // crea il checkbox
        const checkbox = document.createElement("input");
        // crea lo span per il testo della nuova task ed è l'etichetta
        const shopText = document.createElement("span");

        // 2. CONFIGURAZIONE CHECKBOX E TESTO
        // serve per il browser a definire l'identità dell'elemento
        checkbox.type = "checkbox";
        // questo mette il testo nell'etichetta
        shopText.innerText = shopArea;

        // funzione per migliorare e decorare il checkbox in shop
        checkbox.addEventListener('change', function() {
            // id statement usata per far capire se i checkbox sono stati cliccati o meno e hanno il loro stile
            if(checkbox.checked) {
                newShop.classList.add("completed"); // aggiunge lo style della classe .completed CSS

                /* aspettare almeno 300ms (il tempo di un'animazione CSS) prima di spostarlo 
                e setTimeout fa proprio questo */
                setTimeout(() => {
                    // lo sposta nella lista delle task completate dello shopping (listShop)
                    listShop.appendChild(newShop);
                }, 300);
            } else {
                newShop.classList.remove("completed"); // rimuove lo style della classe .completed CSS

                // questo farà in modo che se si deseleziona la task, la si riporta nella lista principale
                shopList.appendChild(newShop);
            }
        });

        // 3. ASSEMBLAGGIO (Prima i pezzi piccoli, poi il pezzo grosso nel DOM)
        newShop.appendChild(checkbox); // mostra il checkbox shop
        newShop.appendChild(shopText); // si aggiunge l'etichetta all'elemento li in shop
        shopList.appendChild(newShop); // mostra nella lista il nuovo elemento in shop

        // 4. PUBBLICAZIONE
        shopInputArea.value = ""; // pulisce l'input del box HTML dello shopping
        
        // 5. MEMORIZZARE I DATI
        // oggetto che poi verrà inserito nell'aray permanentTask
        const newShopTaskObj = {
            testo: shopArea,
            categoria: "shopping",
            completata: false,
        };

        permanentTask.push(newShopTaskObj);
        localStorage.setItem("tasks", JSON.stringify(permanentTask));
    } else {
        alert("Non hai inserito nessun elemento da dover comprare.")
    };
}

// funzione che rimuove il testo dall'input to do list
function clearTodoInput() {
    // inizializzazione e accesso all'elemento input HTML per l'input todo
    const clearTodo = todoInputArea.value;

    // if statement per pulire all'interno dell'input todo
    if (clearTodo !== "") {
        todoInputArea.value = "";
    } else {
        alert("Non c'è niente da rimuovere nel campo.");
    }
}

// funzione che rimuove il testo dall'input shopping list
function clearShopInput() {
    // inizializzazione e accesso all'elemento input HTML per l'input shop
    const clearShop = shopInputArea.value;

    // if statement per pulire all'interno dell'input shopping
    if(clearShop !== "") {
        shopInputArea.value = "";
    } else {
        alert("Non c'è niente da rimuovere nel campo.");
    }
}

// 3. GLI EVENTI (i grilletti) PER TODO E SHOP
// metodo addEventListener in modo da rendere cliccabile il bottone e l'input e creare la prima forma di dinamicità al sito
// bottone add per to do list
btnAddTodo.addEventListener('click', addToDoTask);
// bottone remove per to do list
btnRemoveTodo.addEventListener('click', clearTodoInput);
// bottone add per la shop list
btnAddShop.addEventListener('click', addShopTask);
// bottone remove per la shop list
btnRemoveShop.addEventListener('click', clearShopInput);

// metodo addEventListener in modo da rendere Enter (invio) cliccabile per inviare la nuova task todo
todoInputArea.addEventListener('keydown', (e_add_todo) => {
    // if statement per rendere funzionante il tasto Enter in todo
    if (e_add_todo.key === "Enter") {
        addToDoTask();
    }
})

// metodo addEventListener in modo da rendere Escape (Esc) cliccabile per pulire l'input todo
todoInputArea.addEventListener('keydown', (e_clear_todo) => {
    if (e_clear_todo.key === "Escape") {
        clearTodoInput();
    }
})

// metodo addEventListener in modo da rendere Enter (invio) cliccabile per inviare la nuova shop
shopInputArea.addEventListener('keydown', (e_add_shop) => {
    // if statement per rendere funzionanate il tasto Enter in shop
    if (e_add_shop.key === "Enter") {
        addShopTask();
    }
})

// metodo addEventListener in modo da rendere Escape (Esc) cliccabile per pulire l'input shopping
shopInputArea.addEventListener('keydown', (e_clear_shop) => {
    if (e_clear_shop.key === "Escape") {
        clearShopInput();
    }
})

// eventi per rendere dinamici i bottoni dei menu di todo list e shopping list delle task completate
// TODO
dropdownTodo.addEventListener('click', function() {
    iconTodo.classList.toggle("rotated"); // fa ruotare la freccia
    listTodo.classList.toggle("show"); // mostra la lista delle task completate
})

// SHOP
dropdownShop.addEventListener('click', function() {
    iconShop.classList.toggle("rotated"); // fa ruotare la freccia
    listShop.classList.toggle("show"); // mostra la lista delle task completate
})

// evento che fa si che anche se si clicca al di fuori del menu della lista delle task completate, esssa si chiude comunque
/* TODO */
document.addEventListener('click', (event) => {
    console.log("Hai cliccato su: ", event.target);

    if (!listTodo.contains(event.target) && !dropdownTodo.contains(event.target)) {
        listTodo.classList.remove("show");
        iconTodo.classList.remove("rotated");
    }
})

// SHOP
document.addEventListener('click', (event) => {
    console.log("Hai cliccato su: ", event.target);

    if (!listShop.contains(event.target) && !dropdownShop.contains(event.target)) {
        listShop.classList.remove("show");
        iconShop.classList.remove("rotated");
    }
})


// 5. TEST PER VEDERE SE IL FOGLIO "SCRIPT.JS" FUNZIONA
console.log("test veloce");