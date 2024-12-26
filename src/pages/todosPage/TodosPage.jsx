import { useEffect, useState } from "react";
import TodoItem from "../../components/todoItem/TodoItem";

const URL = "http://localhost:8000/todos";

function TodosPage() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    async function createTodo(event) {
        event.preventDefault();
        const data = {
            status: false,
            title: input
        };

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            getTodos();
        }
    }

    async function getTodos() {
        const response = await fetch(URL);
        const data = await response.json();
        setTodos(data);
    }

    async function deleteTodo(id) {
        const response = await fetch(URL + `/${id}`, {
            method: "DELETE"
        });

        if (response.status === 200) {
            getTodos();
        }
    }

    async function updateTodoStatus(status, id) {
        const data = {
            status
        };
        const response = await fetch(URL + `/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            getTodos();
        }
    }

    async function updateTodoTitle(newTitle, id) {
        const data = {
            title: newTitle
        };
        const response = await fetch(URL + `/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            getTodos();
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <h2>Todos</h2>
            <form onSubmit={createTodo}>
                <input type="text" value={input} onChange={event => setInput(event.target.value)} />
                <button>add</button>
            </form>

            <ul>
                {
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={deleteTodo}
                            onUpdateStatus={updateTodoStatus}
                            onUpdateTitle={updateTodoTitle}
                            input={input}
                        />
                    ))
                }
            </ul>
        </>
    );
}

export default TodosPage;
