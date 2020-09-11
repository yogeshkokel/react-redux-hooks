import React, { useState, useEffect } from 'react';
//import customHooks
import useDocTitle from '../customHooks/useDocTitle';
import useInput from '../customHooks/useInput';

function TodoContainer(props) {
    //initalValue is set here
    const [todos, setTodos] = useState([
        {
            title: "Learn React Hooks",
            isCompleted: false,
            isEditTable: false,
        },
        {
            title: "Build React App",
            isCompleted: false,
            isEditTable: false,
        },
        {
            title: "Publish on Github",
            isCompleted: false,
            isEditTable: false,
        }
    ])
    const [currentDate, setDate] = useState(new Date());

    //call customHooks and pass your value
    useDocTitle('This is todo page');

    //component did mount function
    useEffect(() => {
        //update time every sec
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000);

        //call return function (works as destroy/unmount function) to clear your values or intervals
        return () => {
            clearInterval(interval);
        }
    })

    //when new todo is added
    const addTodo = title => {
        const newTodo = [...todos, { title }];
        setTodos(newTodo);
    }

    //when todo is makred as complete
    //change its flag and call setTodos
    const onComplete = index => {
        todos[index].isCompleted = !todos[index].isCompleted;
        setTodos(todos);
    }

    //splice the value using index
    const removeTodo = index => {
        todos.splice(index, 1);
        setTodos(todos);
    }

    //when edit button is click changed isEditTable to true and call setTodos
    const onEditTodo = index => {
        todos[index].isEditTable = true;
        setTodos(todos);
    }

    //when todo is edited save function is called
    const onSaveTodo = (title, index) => {
        todos[index].title = title;
        todos[index].isEditTable = false;
        setTodos(todos);
    }
    return (
        <div>
            <h4> Your Current Date: {`${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`}</h4>
            <div className="todo-list">
                {
                    todos.map((x, index) => (
                        //call Todo Component and pass functions and value as props
                        <Todo key={index} index={index} todo={x} onComplete={onComplete} removeTodo={removeTodo} onEditTodo={onEditTodo} onSaveTodo={onSaveTodo} />
                    ))
                }
                {/* TodoForm for input */}
                <TodoForm addTodo={addTodo} />
            </div>
        </div>
    );
}

function Todo({ todo, index, onComplete, removeTodo, onEditTodo, onSaveTodo }) {
    const [newTitle, setTitle] = useState(todo.title);

    return (
        //Dynamic styling
        <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }} className="todo">
            {
                !todo.isEditTable
                    ?
                    <span>{todo.title}</span>
                    :
                    <input type="text" value={newTitle} onChange={(e) => { setTitle(e.target.value) }} />
            }
            <div>
                {/* If todo is editable show save button else show edit button */}
                {
                    !todo.isEditTable
                        ?
                        <button onClick={() => { onEditTodo(index) }}>Edit</button>
                        :
                        <button onClick={() => { onSaveTodo(newTitle, index) }}>Save</button>
                }
                {/* If todo is completed show Undo button else show complete button  */}
                {
                    !todo.isCompleted
                        ?
                        <button onClick={() => { onComplete(index) }}>Complete</button>
                        :
                        <button onClick={() => { onComplete(index) }}>Undo</button>
                }
                <button onClick={() => { removeTodo(index) }}>x</button>
            </div>
        </div>
    )
}

function TodoForm({ addTodo }) {
    //use custom hook (useInput) to get values and function from that
    const [value, resetValue, bindValue] = useInput('')

    //Form submit function
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) {
            return;
        } else {
            addTodo(value);
            resetValue()
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* <input className="input" placeholder="Add Todo..." type="text" value={value} onChange={e => setValue(e.target.value)} /> */}
                {/* Instead of using value and onChange we use bindValue from our userInput customHooks */}
                <input className="input" placeholder="Add Todo..." type="text" {...bindValue} />
            </form>
        </div>
    )
}
export default TodoContainer;