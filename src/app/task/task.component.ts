import { Todo } from './../todo';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  editable = false;

  myTodo = {
    title: '',

  };

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAll().subscribe((todos: any[]) => {
     this.todos = todos;
    });
  }

  addTodo() {

    this.todoService.persist(this.myTodo)
        .then(() => {
            console.log('success');
        })
        .catch((error) => {
          console.log('error', error);
        });




    this.initTodo();

  }

  deleteTodo(id) {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {

         this.todoService.delete(id).then(() => {

         })
         .catch((err) => console.error(err));



         Swal.fire({

          title: 'Deleted!',
          text: 'Todo deleted Successfully',
          icon: 'success',
          timer: 5000

        });
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      }
    });




  }


  editTodo(todo) {
      this.editable = true;
      this.myTodo = todo;
  }

  updateTodo() {

    // this.todoService.update(this.myTodo).subscribe((todo) => {
    //   this.initTodo();
    //   this.editable = false;
    // })

  }

  initTodo() {
    this.myTodo = {
      
      title: ''
    };
  }

}
