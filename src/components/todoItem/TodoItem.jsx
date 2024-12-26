function TodoItem({ todo, onDelete, onUpdateStatus, onUpdateTitle, input }) {
    return (
        <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.status}
                onChange={e => {
                    onUpdateStatus(e.target.checked, todo.id);
                }}
            />
            <span className={todo.status ? "active" : ""}>{todo.title}</span>
            <button onClick={() => onDelete(todo.id)}>delete</button>
            <button onClick={() => onUpdateTitle(input, todo.id)}>update</button>
        </li>
    );
}

export default TodoItem;