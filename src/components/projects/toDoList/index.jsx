import React, { useEffect, useState } from "react";
import {
    AppWrapper,
    Header,
    InputSection,
    Input,
    Button,
    TodoList,
    TodoItem,
    TodoText,
    TodoActions,
    FilterSection,
    FilterButton,
} from "./styled";

const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("a2rp_todos");
        return saved ? JSON.parse(saved) : [];
    });
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("a2rp_todos", JSON.stringify(todos));
    }, [todos]);

    const handleAdd = () => {
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
        setNewTodo("");
    };

    const handleDelete = (id) => setTodos(todos.filter((t) => t.id !== id));

    const toggleDone = (id) =>
        setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

    const handleEdit = (id, text) => {
        setEditingId(id);
        setEditValue(text);
    };

    const handleSaveEdit = (id) => {
        setTodos(
            todos.map((t) => (t.id === id ? { ...t, text: editValue } : t))
        );
        setEditingId(null);
    };

    const filteredTodos = todos.filter((t) =>
        filter === "all" ? true : filter === "done" ? t.done : !t.done
    );

    return (
        <AppWrapper>
            <Header>📝 Advanced To-Do List</Header>
            <InputSection>
                <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new task"
                />
                <Button onClick={handleAdd}>Add</Button>
            </InputSection>

            <FilterSection>
                <FilterButton
                    onClick={() => setFilter("all")}
                    $active={filter === "all"}
                >
                    All
                </FilterButton>
                <FilterButton
                    onClick={() => setFilter("done")}
                    $active={filter === "done"}
                >
                    Done
                </FilterButton>
                <FilterButton
                    onClick={() => setFilter("undone")}
                    $active={filter === "undone"}
                >
                    Pending
                </FilterButton>
            </FilterSection>

            <TodoList>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} $done={todo.done}>

                        {editingId === todo.id ? (
                            <>
                                <Input
                                    value={editValue}
                                    onChange={(e) =>
                                        setEditValue(e.target.value)
                                    }
                                />
                                <Button onClick={() => handleSaveEdit(todo.id)}>
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <TodoText
                                    onClick={() => toggleDone(todo.id)}
                                    $done={todo.done}
                                >
                                    {todo.text}
                                </TodoText>
                                <TodoActions>
                                    <Button
                                        onClick={() =>
                                            handleEdit(todo.id, todo.text)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        Delete
                                    </Button>
                                </TodoActions>
                            </>
                        )}
                    </TodoItem>
                ))}
            </TodoList>
        </AppWrapper>
    );
};

export default TodoApp;
