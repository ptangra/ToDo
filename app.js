// ToDo Class: Represents a ToDo list
class ToDo{
	constructor(title, priority, date){
		this.title = title;
		this.priority = priority;
		this.date = date;
	}
}
// UI Class : Handle UI Tasks
class UI {
	static displayToDo(){
		const ToDo = Store.getToDo();

		ToDo.forEach((todo) => UI.addToDoToList(todo));
	}
	static addToDoToList(todo){
		const list = document.querySelector('#todo-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${todo.title}</td>
			<td>${todo.priority}</td>
			<td>${todo.date}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;
		list.appendChild(row);
	}

	static deleteFields(el){
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className){
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#todo-form');
		container.insertBefore(div, form);
		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 2000);
	}

	static clearFields(){
		document.querySelector('#title').value = '';
		document.querySelector('#priority').value = '';
		document.querySelector('#date').value = '';
	}
}
// Store Class : Handles Storage
class Store{
	static getToDo(){
		let ToDo;
		if (localStorage.getItem('ToDo') == null) {
			ToDo = [];
		}else{
			ToDo = JSON.parse(localStorage.getItem('ToDo'));
		}
		return ToDo;
	}

	static addToDo(todo){
		const ToDo = Store.getToDo();
		ToDo.push(todo);

		localStorage.setItem('ToDo', JSON.stringify(ToDo));
	}

	static removeToDo(data){
		const ToDo = Store.getToDo();

		ToDo.forEach((todo,index) => {
			if (todo.data === data) {
				ToDo.splice(index, 1);
			}
		});
		localStorage.setItem('ToDo', JSON.stringify(ToDo));
	}
}



// Event : Display List
document.addEventListener('DOMContentLoaded', UI.displayToDo);

// Event : Add a ToDo
document.querySelector('#todo-form').addEventListener('submit', (e)=>{
//Prevent actual submit
		e.preventDefault();
// Get form values
		const title = document.querySelector('#title').value;
		const priority = document.querySelector('#priority').value;
		const date = document.querySelector('#date').value;

		// Validate
		if (title === '' || priority === '' || date === '') 
		{
			UI.showAlert('Please fill all fields', 'danger');
		}else{
		
		// Instatiate todo list
		const todo = new ToDo(title, priority, date);
		
		// Add elements to UI
		UI.addToDoToList(todo);

		// Add todo to store
		Store.addToDo(todo);
		// Show successs message
		UI.showAlert('Action Added', 'success')
		
		//Clear fields
		UI.clearFields();

		}
	});

// Event : Remove a Todo
document.querySelector('#todo-list').addEventListener('click', (e)=>
{
	// Remove todo from UI
	UI.deleteFields(e.target);

	// Remove todo from store
	Store.removeToDo
	(e.target.parentElement.previousElementSibling.textContent);

	// Show success message
	UI.showAlert('Action deleted', 'success');
});