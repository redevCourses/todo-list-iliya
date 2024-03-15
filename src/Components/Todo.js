import { useState, useEffect } from 'react'
import { ConfigProvider, Typography, Alert, Layout, Button, List, Modal } from 'antd'
import { UnorderedListOutlined, LogoutOutlined, CloseOutlined, ClearOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import AddTodo from './AddTodo'
import TodoList from './TodoList';
import checkAuth from './HOC/checkAuth';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid'

const Todo = ({ token, alertWindow, showAlert, messages, setMessages }) => {

    const [todos, setTodos] = useState([])
    const [collapsed, setCollapsed] = useState(true)

    const { Header, Content, Footer, Sider } = Layout
    const { Text } = Typography
    const { Item } = List

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
    const config = { headers }

    const fetchData = async () => {
        try {
            const response = await axios.get('https://todo-redev.herokuapp.com/api/todos', config)
            console.log('Данные получены: ', response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
    const getTasks = async () => {
        const tasks = await fetchData()
        setTodos(tasks)
    }

    useEffect(() => {
        getTasks()
    }, [])

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Layout>

            {/* Header block*/}

            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            headerBg: '#21152b'
                        }
                    },
                    token: {
                        colorLink: 'white',
                        colorLinkActive: '#892ad6',
                        fontSize: 16
                    }
                }}
            >
                <Header className='header'>
                    <Button type='link' icon={<UnorderedListOutlined />} onClick={() => setCollapsed(!collapsed)}>History</Button>
                    <Button type='link' onClick={logout} icon={<LogoutOutlined />}>Log out</Button>
                </Header>
            </ConfigProvider>

            {/* Content block */}

            <Layout>
                <Content>
                    <div className='todo'>

                        {/* Alert windows */}

                        {showAlert ?
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorSuccessBg: '#21152b',
                                        colorSuccessBorder: '#21152b',
                                        colorText: 'white'
                                    }
                                }}
                            >
                                <Alert
                                    message='Выполнено!'
                                    type='success'
                                    description='Действие выполнено успешно.'
                                    showIcon
                                />
                            </ConfigProvider> :
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorSuccessBg: '#892ad6',
                                        colorSuccessBorder: '#892ad6',
                                        colorText: '#892ad6',
                                        colorSuccess: '#892ad6'
                                    }
                                }}
                            >
                                <Alert
                                    message='Выполнено!'
                                    type='success'
                                    description='Действие выполнено успешно.'
                                    showIcon
                                />
                            </ConfigProvider>
                        }

                        {/* Todo list */}

                        <div className='todo-background'>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorText: 'white',
                                        fontSize: 36,
                                    }
                                }}
                            >
                                <Text className='title'>Todo list</Text>
                            </ConfigProvider>
                            <div className='todo-list'>
                                <AddTodo
                                    todos={todos}
                                    setTodos={setTodos}
                                    config={config}
                                    alertWindow={alertWindow}
                                    messages={messages}
                                    setMessages={setMessages}
                                />
                                <TodoList
                                    todos={todos}
                                    setTodos={setTodos}
                                    config={config}
                                    alertWindow={alertWindow}
                                    messages={messages}
                                    setMessages={setMessages}
                                />
                            </div>
                        </div>
                    </div>
                </Content>

                {/* Sider block */}

                <ConfigProvider
                    theme={{
                        token: {
                            colorText: 'white',
                            fontSize: 12
                        },
                        components: {
                            Layout: {
                                headerBg: '#21152b',
                                siderBg: '#21152b',
                                footerBg: '#21152b'
                            }
                        }
                    }}>
                    <Sider width={300} collapsed={collapsed} collapsedWidth={0} style={{
                        backgroundColor: '#21152b'
                    }}>
                        <Layout>

                            {/* Sider header */}

                            <Header style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultBg: '#21152b',
                                                defaultBorderColor: '#21152b',
                                                defaultHoverBg: '#21152b',
                                                defaultHoverBorderColor: '#21152b',
                                                defaultHoverColor: '#892ad6',
                                                onlyIconSize: 18
                                            }
                                        }
                                    }}
                                >
                                    <Button icon={<CloseOutlined />} onClick={() => setCollapsed(!collapsed)}></Button>
                                    <Button icon={<ClearOutlined />} onClick={() => {
                                        setMessages([])
                                        localStorage.removeItem('messages')
                                    }}></Button>
                                </ConfigProvider>
                            </Header>

                            {/* Sider content */}

                            <Content>
                                <List style={{
                                    backgroundColor: '#21152b'
                                }}>
                                    {messages.map(item => (
                                        <Item key={uuid4()}>{item}</Item>
                                    ))}
                                </List>
                            </Content>
                        </Layout>
                    </Sider>
                </ConfigProvider>
            </Layout>

            {/* Footer block */}

            <ConfigProvider
                theme={{
                    components: {
                        Layout: {
                            footerBg: '#21152b'
                        }
                    },
                    token: {
                        colorText: 'white',
                        fontSize: 16
                    }
                }}
            >
                <Footer style={{
                    textAlign: 'center'
                }}>
                    Made by Elistar in 2024.
                </Footer>
            </ConfigProvider>
        </Layout>

    );
}


export default checkAuth(Todo)