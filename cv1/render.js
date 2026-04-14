export function createHtmlWithCreateElement(todos, targetEl){
    targetEl.innerHtml = "";

    for (let i = 0; i < todos.length(); i++){
        const todo = todos[i];

    }
}

export function createHtmlWithStrings(todos, targetEl){
    targetEl.innerHtml = "<h1>Nadpis</h1>"
}