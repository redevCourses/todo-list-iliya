import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Typography, Flex, ConfigProvider, Alert } from 'antd'
import axios from 'axios'

const AuthForm = ({ alertWindow, showAlert, alertProps, setAlertProps }) => {
    const {
        handleSubmit,
        control,
        formState: {
            errors
        },
        reset
    } = useForm({
        mode: 'onBlur'
    })

    const { Text } = Typography

    const navigate = useNavigate()

    const fetchAuth = async (data) => {
        try {
            const response = await axios.post('https://todo-redev.herokuapp.com/api/auth/login', data)
                .then(response => localStorage.setItem('token', response.data.token))
            alertWindow()
            setAlertProps({
                type: 'success',
                message: 'Готово!',
                description: 'Вход выполнен успешно.'
            })
            navigate('/todo-list')
        } catch (error) {
            console.log(error);
            alertWindow()
            setAlertProps({
                type: 'error',
                message: 'Ошибка!',
                description: `${error.response.data.message}.`
            })
        }
    }

    const onSubmit = (data) => {
        try {
            console.log(data);
            fetchAuth(data)
            reset()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='todo'>
            {showAlert ?
                <ConfigProvider
                    theme={{
                        token: {
                            colorSuccessBg: '#21152b',
                            colorErrorBg: '#21152b',
                            colorSuccessBorder: '#21152b',
                            colorErrorBorder: '#21152b',
                            colorText: 'white'
                        }
                    }}>
                    <Alert
                        showIcon
                        type={alertProps.type}
                        message={alertProps.message}
                        description={alertProps.description} />
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
            <form>
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: 'white',
                            fontSize: 36,
                        }
                    }}
                >
                    <Text className='title'>Войти</Text>
                </ConfigProvider>
                <Flex vertical justify='center' align='center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}
                    >
                        <Text className='label-auth'>email</Text>
                    </ConfigProvider>
                    <Controller
                        name='email'
                        control={control}
                        rules={{
                            required: 'Поле обязательно для заполнения'
                        }}
                        render={({ field }) => (
                            <ConfigProvider
                                theme={{
                                    token: {
                                        borderRadius: 10,
                                        lineWidth: 1,
                                        colorPrimary: '#892ad6',
                                        colorBorder: '#892ad6',
                                        colorBgContainer: '#21152b',
                                        colorText: 'white',
                                        colorTextPlaceholder: '#5c5c5c',
                                        controlHeightLG: 40,
                                        fontSize: 20,
                                    },
                                    components: {
                                        Input: {
                                            activeShadow: '#892ad6',
                                            activeBorderColor: '#892ad6',
                                            hoverBorderColor: '#892ad6',
                                            hoverBg: '#21152b',
                                            paddingBlock: 6,
                                        }
                                    }
                                }}
                            >
                                <Input style={{ width: 400 }} {...field} placeholder='example@example.com' />
                            </ConfigProvider>
                        )}
                    />
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: '#00b39b',
                                fontSize: 16
                            }
                        }}
                    >
                        <Text className='error-text'>{errors.email?.message}</Text>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}
                    >
                        <Text className='label-auth'>password</Text>
                    </ConfigProvider>
                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: 'Поле обязательно для заполнения'
                        }}
                        render={({ field }) => (
                            <ConfigProvider
                                theme={{
                                    token: {
                                        borderRadius: 10,
                                        lineWidth: 1,
                                        colorPrimary: '#892ad6',
                                        colorBorder: '#892ad6',
                                        colorBgContainer: '#21152b',
                                        colorText: 'white',
                                        colorTextPlaceholder: '#5c5c5c',
                                        controlHeightLG: 40,
                                        fontSize: 20,
                                    },
                                    components: {
                                        Input: {
                                            activeShadow: '#892ad6',
                                            activeBorderColor: '#892ad6',
                                            hoverBorderColor: '#892ad6',
                                            hoverBg: '#21152b',
                                            paddingBlock: 6
                                        }
                                    }
                                }}
                            >
                                <Input style={{ width: 400 }} {...field} placeholder='Example' />
                            </ConfigProvider>
                        )}
                    />
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: '#00b39b',
                                fontSize: 16
                            }
                        }}
                    >
                        <Text>{errors.password?.message}</Text>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                borderRadius: 10,
                                lineWidth: 1,
                                colorBorder: '#892ad6',
                                colorBgContainer: '#892ad6',
                                colorText: 'white',
                                controlHeight: 45,
                                colorBgContainerDisabled: '#892ad6',
                                fontSize: 22,
                            },
                            components: {
                                Button: {
                                    colorTextDisabled: '#aaaaaa',
                                    defaultHoverBorderColor: '#21152b',
                                    defaultHoverColor: 'white'
                                }
                            }
                        }}
                    >
                        <Button 
                        className='login' 
                        htmlType='submit' 
                        onClick={handleSubmit(onSubmit)}
                        style={{
                            marginTop: '50px'
                        }}
                        >Log In</Button>
                    </ConfigProvider>
                </Flex>
            </form>
            <ConfigProvider
                theme={{
                    token: {
                        colorText: 'white',
                        fontSize: 18,
                        colorLink: 'white'
                    }
                }}
            >
                <Text style={{
                    marginTop: '140px'
                }}>
                    Don't have an account?
                    <Link to='/register'> <Text underline>Sign Up</Text></Link>
                </Text>
            </ConfigProvider>
        </div>
    )
}

export default AuthForm;