'use strict';

class Todo {
    constructor(form, input, todoList, todoComleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoComleted = document.querySelector(todoComleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.input.value = '';
        this.todoList.textContent = '';
        this.todoComleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);
        
        if (todo.completed) {
            this.todoComleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()){
            const newTodo = {
            value: this.input.value,
            completed: false,
            key: this.generateKey(),
        }
        this.todoData.set(newTodo.key, newTodo);
        console.log([...this.todoData]);
        this.render();
    } else {
        alert('Не могу добавить пустое поле!');
    };
}

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
deleteItem(current) {
    for (const key of this.todoData.keys()) {
        if (current === key) {
            this.todoData.delete(current);
        }
    }

    this.render();
}

completedItem(current) {
    for (const [key, value] of this.todoData) {
        if (current === key && value.completed === false) {
            value.completed = true;
        } else if (current === key && value.completed === true) {
            value.completed = false;
        }
    }
    
    this.render();
    console.log(current);
    

}

    handler() {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', (event) => {
            const target = event.target;
            target.key = target.closest('.todo-item').key;
        if (target.matches('.todo-remove')) {
            this.deleteItem(target.key);
        } else if (target.matches('.todo-complete')) {
            this.completedItem(target.key);
        }
        });
        
    }
    init() {
            this.form.addEventListener('submit', this.addTodo.bind(this));
            this.render();
            this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();