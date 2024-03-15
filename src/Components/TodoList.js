import { Input, Button, Typography, Checkbox, List, ConfigProvider, Flex } from 'antd'
import { useState } from 'react';
import { DeleteFilled, EditFilled, SaveFilled } from '@ant-design/icons'
import withLogger from './HOC/withLogger'
import axios from 'axios';

const TodoList = ({
    todos,
    setTodos,
    config,
    toggleMessage,
    editMessage,
    removeMessage,
    activateMessage,
    editingMessage,
    messages,
    clearStorage,
    alertWindow
}) => {
    const [edit, setEdit] = useState(null)
    const [editText, setEditText] = useState('')
    const [completed, setCompleted] = useState(false)

    const { Item } = List;
    const { Text } = Typography;

    const fetchRemove = async (taskId) => {
        try {
            const response = await axios.delete(`https://todo-redev.herokuapp.com/api/todos/${taskId}`, config)
            console.log('Данные удалены: ', response.data);
        } catch (error) {
            console.log('Ошибка!', error);
        }
    }

    const fetchToggle = async (taskId, newTask) => {
        try {
            const response = await axios.patch(`https://todo-redev.herokuapp.com/api/todos/${taskId}/isCompleted`, newTask, config)
            console.log('Данные обновлены: ', response.data);
        } catch (error) {
            console.log('Ошибка!', error);
        }
    }

    const fetchSave = async (taskId, newTask) => {
        try {
            const response = await axios.patch(`https://todo-redev.herokuapp.com/api/todos/${taskId}`, newTask, config)
            console.log('Данные сохранены: ', response.data);
        } catch (error) {
            console.log('Ошибка!', error);
        }
    }

    const disabledSaveButton = () => {
        if (editText.length === 0 || editText.trim().length !== editText.length) {
            return true
        }
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        fetchRemove(id)
    }
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        setCompleted(!completed)
        fetchToggle(id)
    }

    const editTodo = (id, title) => {
        setEdit(id)
        setEditText(title)
    }

    const saveTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: editText } : todo))
        setEdit(null)
        fetchSave(id, {
            title: editText
        })
    }

    const consoleMessages = () => {
        messages.forEach(message => {
            console.log(message);
        })
    }
    return (
        <>
            <Flex justify='center' align='center'>
                <List size='large'>
                    {
                        todos.map(todo => (
                            <Item key={todo.id}>
                                {
                                    edit === todo.id ?

                                        // Edit todo block

                                        <div className='edit-todo'>
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        borderRadius: 10,
                                                        lineWidth: 1,
                                                        colorBorder: '#892ad6',
                                                        colorBgContainer: '#21152b',
                                                        colorText: 'white',
                                                        colorTextPlaceholder: '#aaaaaa',
                                                        controlHeightLG: 40,
                                                        fontSize: 18,
                                                    },
                                                    components: {
                                                        Input: {
                                                            activeShadow: '#892ad6',
                                                            activeBorderColor: '#892ad6',
                                                            hoverBorderColor: '#892ad6',
                                                            hoverBg: '#21152b',
                                                        }
                                                    }
                                                }}
                                            >
                                                <Input
                                                    value={editText}
                                                    onChange={(event) => setEditText(event.target.value)}
                                                    size='large'
                                                    onPressEnter={() => {
                                                        saveTodo(todo.id)
                                                        editMessage(todo.title)
                                                        alertWindow()
                                                    }}
                                                />
                                            </ConfigProvider>
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        borderRadius: 10,
                                                        lineWidth: 1,
                                                        colorBorder: '#892ad6',
                                                        colorBgContainer: '#892ad6',
                                                        colorText: 'white',
                                                        controlHeightLG: 40,
                                                    },
                                                    components: {
                                                        Button: {
                                                            defaultColor: 'white',
                                                            defaultHoverBorderColor: '#892ad6',
                                                            defaultHoverColor: '#21152b',
                                                            defaultHoverBg: '#892ad6',
                                                            defaultBg: '#892ad6',
                                                            defaultBorderColor: '#892ad6',
                                                            onlyIconSize: 20
                                                        }
                                                    }
                                                }}
                                            >
                                                <Button
                                                    onClick={() => {
                                                        saveTodo(todo.id)
                                                        editMessage(todo.title)
                                                        alertWindow()
                                                    }}
                                                    disabled={disabledSaveButton()}
                                                    size='large'
                                                    icon={<SaveFilled />}></Button>
                                            </ConfigProvider>
                                        </div>
                                        :

                                        // Todo item block

                                        <div className='todo-item'>
                                            <ConfigProvider
                                                theme={{
                                                    token: {
                                                        colorText: 'white',
                                                        fontSize: 20,
                                                        colorBgContainer: '#892ad6',
                                                        colorBorder: '#892ad6',
                                                        colorPrimaryHover: '#892ad6',
                                                        colorPrimaryBorder: '#892ad6',
                                                        colorPrimary: '#892ad6'
                                                    }
                                                }}
                                            >
                                                <Checkbox
                                                    checked={completed}
                                                    type='text'
                                                    onClick={() => {
                                                        toggleTodo(todo.id)
                                                        alertWindow()
                                                        if (todo.completed) {
                                                            toggleMessage(todo.title)
                                                        } else {
                                                            activateMessage(todo.title)
                                                        }
                                                    }}
                                                >
                                                    <Text
                                                        delete={completed}
                                                    >
                                                        {todo.title}
                                                    </Text>
                                                </Checkbox>
                                            </ConfigProvider>
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Button: {
                                                            defaultColor: 'white',
                                                            defaultHoverBorderColor: '#892ad6',
                                                            defaultHoverColor: '#21152b',
                                                            defaultHoverBg: '#892ad6',
                                                            defaultBg: '#892ad6',
                                                            defaultBorderColor: '#892ad6',
                                                            onlyIconSize: 20
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className='edit-buttons'>
                                                    <Button
                                                        onClick={() => {
                                                            editTodo(todo.id, todo.title)
                                                            editingMessage(todo.title)
                                                        }}
                                                        icon={<EditFilled />}
                                                    >
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            removeTodo(todo.id)
                                                            removeMessage(todo.title)
                                                            alertWindow()
                                                        }}
                                                        icon={<DeleteFilled />}
                                                    >
                                                    </Button>
                                                </div>
                                            </ConfigProvider>
                                        </div>
                                }
                            </Item>
                        )
                        )
                    }
                </List>
            </Flex>
        </>
    )
}

export default withLogger(TodoList);