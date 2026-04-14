import { createHtmlWithCreateElement,createHtmlWithStrings } from "./render";

const state = {
	todos: [
		{ text: 'Hi', completed: true  },
		{ text: 'Hello', completed: false },
		{ text: 'Hi there!', completed: true },
	],
	filter: 'all'
};

const todoListEl = document.querySelector(".todo-list");
createHtmlWithCreateElement(state.todos, targetEl)