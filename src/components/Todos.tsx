import React, {FormEvent, ChangeEvent, useState} from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { v4 as uuidv4 } from 'uuid';

import { Row } from "./Row";
import { AddTodo } from "./AddTodo";
import { data } from "../todos";
import { Todo } from "../types";
import useDarkMode from "../hook/useDarkMode";

export const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>(data);
    const [task, setTask] = useState<string>("");

    const handleAddTodo = (todo: Todo) => {
        const updatedTodos = [...todos, todo];
        setTodos(updatedTodos);
        setTask("");
    }

    const handleSubmitTodo = (e: FormEvent) => {
        e.preventDefault();

        const todo = {
            id: uuidv4(),
            task: task,
            isCompleted: false,
            isEditing: false
        }
        task && handleAddTodo(todo);
    }

    const handleChange = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setTask(value);
    }

    const handleCheckTodo = (id: string) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id)
        setTodos(updatedTodos);
    }

    const [darkMode, setDarkMode] = useDarkMode();
    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
    };

    const completedTodos = () => {
        const completedTodos = todos.filter((Todo) => Todo.isCompleted)
        return completedTodos.length
    }

    const activeTodos = () => {
        const activeTodos = todos.filter((Todo) => !Todo.isCompleted)
        return activeTodos.length
    }

    const handleEditTodo = (id: string) => {
        const todo = todos.filter((todo) => todo.id === id)
        todo[0].isEditing = true;
        updateList()
    }

    const handleChangeTodo = (event:FormEvent) => {
        event.preventDefault()
        // @ts-ignore
        const todo_id = event.target[0].value
        // @ts-ignore
        const new_name = event.target[1].value
        const todo = todos.filter((todo) => todo.id === todo_id)
        todo[0].task = new_name
        todo[0].isEditing = false
        updateList()
    }

    const handleClearCompleted = () => {
        const not_completed = todos.filter((todo) => !todo.isCompleted)
        setTodos(not_completed);
    }

    const handleInvertSelection = () => {
        console.log('Inverting Selection')
        const updatedTodos = todos.map((todo) => {
            if (todo.isCompleted) {
                return {
                    ...todo,
                    isCompleted: false
                }
            }
            else{
                return {
                    ...todo,
                    isCompleted: true
                }
            }
        });
        setTodos(updatedTodos);
    }

    const updateList = () => {
        const updatedTodos = [...todos];
        setTodos(updatedTodos);
    }

    return (
        <section className="h-screen flex items-center flex-col justify-center py-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 font-large text-lg text-center dark:text-white">Danny Johansson's ToDo List - React</h1>
            <div className="p-5 bg-white dark:bg-slate-800 sm:rounded-lg space-y-8">
                <div className="flex justify-between">
                    <h1 className="inline-block w-80 text-lg dark:text-white text-center">Todos</h1>
                    <DarkModeSwitch
                        style={{ width: '20px', height: '20px' }}
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                </div>
                <AddTodo handleSubmitTodo={handleSubmitTodo}
                         handleChange={handleChange}
                         task={task}
                />
                <div className="h-2 text-center dark:text-white text-sm p-0 m-0">{completedTodos()} of {todos.length} {todos.length === 1 ? 'ToDo' : 'ToDos'} Completed - {activeTodos()} {activeTodos() === 1 ? 'ToDo' : 'ToDos'} Left </div>
                <div className="h-5 text-center dark:text-white">
                    <button className="mr-4 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 active:bg-yellow-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
                            onClick={handleInvertSelection}
                    >Invert Completed</button>
                    <button className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 active:bg-red-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
                            onClick={handleClearCompleted}
                    >Clear Completed</button>
                </div>
                <div className="max-h-80 h-80 overflow-auto scroll-auto">
                    {todos.map((todo) => (
                        <Row key={todo.id}
                             todo={todo}
                             handleDeleteTodo={handleDeleteTodo}
                             handleCheckTodo={handleCheckTodo}
                             handleEditTodo={handleEditTodo}
                             handleChangeTodo={handleChangeTodo}
                        />
                    ))}
                </div>

            </div>
            <span className="mt-3 font-large text-lg dark:text-white">Double Click a ToDO item to edit it</span>
        </section>
    )
}