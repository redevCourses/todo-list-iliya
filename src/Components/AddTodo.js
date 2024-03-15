import { Input, Button, ConfigProvider } from 'antd'
import { useState } from 'react';
import withLogger from './HOC/withLogger';
import axios from 'axios';

const AddTodo = ({
    todos,
    setTodos,
    config,
    addMessage,
    alertWindow
}) => {
    const [todoTitle, setTodoTitle] = useState('')
    const fetchAdd = async (todo, headers) => {
        try {
            const response = await axios.post('https://todo-redev.herokuapp.com/api/todos', todo, headers)
            console.log('Таска создана: ', response.data);
            return response.data
        } catch (error) {
            console.log('Ошибка!', error);
        }
    }

    const addTodo = async () => {
        const todo = await fetchAdd({
            title: todoTitle,
        }, config)
        setTodos([...todos, todo])
        setTodoTitle('')
        addMessage(todoTitle)
    }

    const disabledButton = () => {
        if (todoTitle.length === 0 || todoTitle.trim().length !== todoTitle.length) {
            return true
        }
    }

    return (
        <div className='add-todo'>
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
                    size='large'
                    style={{
                        width: 500,
                        margin: '0 5px'
                    }}
                    placeholder='Enter your task'
                    value={todoTitle}
                    onChange={(event) => setTodoTitle(event.target.value)}
                    onPressEnter={() => {
                        addTodo()
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
                        colorBgContainerDisabled: '#892ad6'
                    },
                    components: {
                        Button: {
                            defaultHoverBorderColor: '#892ad6',
                            defaultHoverColor: 'white',
                            colorTextDisabled: '#aaaaaa',
                            contentFontSizeLG: 24
                        }
                    }
                }}
            >
                <Button
                    onClick={() => {
                        addTodo()
                        alertWindow()
                    }}
                    style={{
                        margin: '0 5px'
                    }}
                    size='large'
                    disabled={disabledButton()}
                >Add task</Button>
            </ConfigProvider>
        </div>
    )
}

export default withLogger(AddTodo);