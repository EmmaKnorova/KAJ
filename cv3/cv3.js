import { createHtmlWithCreateElement, createHtmlWithStrings } from "./render.js";


/* Predefined initial state */
const initialState = {
	todos: [
		{ text: 'Hi', completed: true  },
		{ text: 'Hello', completed: false },
		{ text: 'Hi there!', completed: true },
	],
	filter: 'all'
};


//
// 1. Prototype expansion
//
// Add method on Object prototype. This method will modify the object
// and add current timestamp to it. All created objects inherit from
// Object prototype and will have this method.
Object.prototype.addTimestamp = function () {
	this.timestamp = Date.now();
}

//
// 2. Class containing state
//
class State {
	#todos;
	#filter;

	constructor(initialFilter, initialTodos){
		this.#filter = initialFilter;
		this.#todos	= initialTodos;
	}

	addTodo(todo){
		this.#todos.push(todo);
	}

	setFilter(filter){
		this.#filter = filter;
	}

	getTodos(){
		let todos = this.#todos.filter(todo => {
		if (this._filter === 'all') {
			return true;
		} else if (this._filter === 'completed') {
			return todo.completed === true;
		} else if (this._filter === 'active') {
			return todo.completed === false;
		}
		})
		return todos;
	}
}

const state = new State(initialState.todos, initialState.filter);
const todoListEl = document.querySelector('.todo-list');
createHtmlWithStrings(state.getTodos(), todoListEl);


//
// 4. Handle main input
//
const inputEl = document.querySelector('.new-todo');
inputEl.addEventListener('keyup', function (event) {
	// EXCERCISE: inspect the event object in dev console

	if (event.key !== "Enter") {
		return;
	}

	// Update app state
	const todo = {
		text: inputEl.value,
		completed: false
	};
	state.addTodo(todo);

	// Update html
	inputEl.value = '';
	createHtmlWithStrings(state.getTodos(), todoListEl);
});


//
// 5. Handle filters
//
const filters = {
	all: document.querySelector('#filter-all'),
	active: document.querySelector('#filter-active'),
	completed: document.querySelector('#filter-completed')
};

for (const [key, filterEl] of Object.entries(filters)) {
	filterEl.addEventListener('click', function () {
		filtersClick(key);
	})
}

function filtersClick (newFilterType) {

	for(const filterEl of Object.values(filters)){
		filterEl.classList.remove("selected");
	}

	filters[newFilterType].classList.add('selected');

	state.setFilter(newFilterType);

	createHtmlWithCreateElement(state.getTodos(), todoListEl);
}