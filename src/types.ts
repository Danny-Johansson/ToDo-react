import {ChangeEvent, FormEvent} from "react";

export type Todo = {
    id: string,
    task: string,
    isCompleted: boolean,
    isEditing: boolean
}

export type TodoProps = {
    todo: Todo,
    handleCheckTodo: (id: string) => void,
    handleDeleteTodo: (id:string) => void,
    handleEditTodo: (id:string) => void,
    handleChangeTodo: (event:FormEvent) => void,
}

export type AddTodoProps = {
    task: string
    handleSubmitTodo: (e: FormEvent) => void
    handleChange: (e: ChangeEvent) => void
}