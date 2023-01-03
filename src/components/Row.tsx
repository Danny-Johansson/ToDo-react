import { TodoProps } from "../types";

export const Row = ({
        todo: {id, task, isCompleted,isEditing},
        handleCheckTodo,
        handleDeleteTodo,
        handleEditTodo,
        handleChangeTodo,
   }: TodoProps) => {

    return (
        <div className="shadow rounded-lg p-3 mt-4 bg-gray-50 dark:bg-slate-700 flex justify-between">
            {
                isEditing ?
                    ''
                    :
                    <div className="flex items-center">
                        <input
                            id={'task-name-'+id}
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => handleCheckTodo(id)}
                        />
                        <label htmlFor={'task-name-'+id} aria-hidden="true"></label>

                    </div>
            }
            {
                isEditing ?
                    <form onSubmit={handleChangeTodo} className="flex w-max">
                        <input type="hidden" name="todo_id" value={id}  />
                        <input placeholder="New Text" className="w-60 h-10 px-3 py-2 bg-white dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500 border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-tl-lg rounded-bl-lg sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" id="edit-todo" minLength={2} type="text" name="new_name" defaultValue={ task } required autoFocus />
                        <button type="submit"
                                aria-label="Edit ToDo"
                                className="h-10 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 active:bg-yellow-700 px-5 py-2 text-sm leading-5 rounded-tr-lg rounded-br-lg font-semibold text-white">
                            Edit
                        </button>
                    </form>
                    :
                    <span className={` h-10 ml-2 pt-2 font-medium text-slate-800 dark:text-gray-50 text-sm ${isCompleted ? 'line-through' : ''}`}
                    onDoubleClick={() => handleEditTodo(id)}
                    >{ task }</span>
            }
            {
                isEditing ?
                    ''
                    :
                    <div className="">
                        <button className="bg-red-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-red-300 active:bg-red-700 px-2 py-1 text-sm leading-5 rounded-full font-semibold text-white" aria-label="Delete a todo" onClick={() => handleDeleteTodo(id)}>
                            X
                        </button>
                    </div>
            }

        </div>
    )
}