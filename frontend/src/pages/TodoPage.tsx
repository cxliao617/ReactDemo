import React, { useState, useEffect, useRef } from 'react';
import './../index.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { ITodo, TodoBody, TodoStatus } from '../types/todo';
import { confirmDialog ,ConfirmDialog} from 'primereact/confirmdialog';
import { TodoService } from '../services/TodoService';

export default function TodoPage() {
  const [inputTodo, setInputTodo] = useState<string>('');
  const [todolist, setTodolist] = useState<Array<ITodo>>([]);

  const todoService = new TodoService();


  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    await todoService.getTodos().then((res) => setTodolist(res.data.todos));
  };
  const createTodo = async () => {
    await todoService
      .postTodo({ name: inputTodo, status: TodoStatus.NotStarted })
      .then(() => getTodos());
  };
  const acceptUpdateStatus = async (todoObject: ITodo) => {
    if (todoObject._id !== undefined) {
      await todoService
        .putTodo({ _id: todoObject._id, name: todoObject.name, status: TodoStatus.Process })
        .then(() => getTodos());
    }

    console.log(todoObject);
  };
  const acceptDeleteTodo = async (todoObject: ITodo) => {
    await todoService.deleteTodo(todoObject._id).then(() => getTodos());
  };
  const rejectUpdateStatus = (todoObject: TodoBody) => {
    console.log(todoObject);
    console.log('Cancel update status');
  };
  const rejectDeleteTodo = (todoObject: TodoBody) => {
    console.log(todoObject);
    console.log('Cancel delete todo');
  };
  const confirmUpdateStatus = (todoObject: ITodo) => {
    return confirmDialog({
      message: 'Do you want to process this todo item?',
      header: 'Process Todo',
      accept: () => acceptUpdateStatus(todoObject),
      reject: () => rejectUpdateStatus(todoObject),
    });
  };
  const confirmDeleteTodo = (todoObject: ITodo) => {
    return confirmDialog({
      message: 'Do you want to Delete this todo item?',
      header: 'Delete Todo',
      accept: () => acceptDeleteTodo(todoObject),
      reject: () => rejectDeleteTodo(todoObject),
    });
  };
  const notStartTag = () => {
    return <Tag value="Not Started"></Tag>;
  };
  const processTag = () => {
    return <Tag value="Process" severity="warning"></Tag>;
  };
  const cardFooter = (todoObject: ITodo) => {
    return (
      <span>
        <Button
          className="p-button-success p-m-1"
          label="Start"
          icon="pi pi-play"
          onClick={() => confirmUpdateStatus(todoObject)}
        />
        <Button
          className="p-button-danger p-m-1"
          label="Delete"
          icon="pi pi-trash"
          onClick={() => confirmDeleteTodo(todoObject)}
        />
      </span>
    );
  };
  const cardTemplate = (todoObject: ITodo) => {
    return (
      <div className="p-d-flex p-m-1 p-col-6" key={todoObject._id}>
        <Card title={todoObject.name} footer={cardFooter(todoObject)}>
          <div className="p-text-right">
            {todoObject.status === TodoStatus.NotStarted ? notStartTag() : processTag()}
          </div>
        </Card>
      </div>
    );
  };
  return (
    <>
      <h3>hello</h3>
      <div className="p-d-inline-flex p-mt-6">
        <div className="p-mb-2 p-m-1">
          <span className="p-float-label">
            <InputText
              id="inTodo"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
            />
            <label htmlFor="inTodo">Create Todo </label>
          </span>
        </div>
        <div className="p-mb-2 p-m-1">
          <Button label="Submit" onClick={() => createTodo()}></Button>
        </div>
      </div>
      <div className="p-mt-2">{todolist.map((e) => cardTemplate(e))}</div>
      <div><ConfirmDialog /></div>
    </>
  );
}
