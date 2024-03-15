import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Typography, ConfigProvider, Radio, Flex, Alert } from 'antd'
import axios from 'axios'

const RegForm = ({ alertWindow, showAlert, alertProps, setAlertProps }) => {

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
    const { Group, Button } = Radio

    const navigate = useNavigate()

    const fetchReg = async (data) => {
        try {
            const response = await axios.post('https://todo-redev.herokuapp.com/api/users/register', data)
            navigate('/login')
            alertWindow()
            setAlertProps({
                type: 'success',
                message: 'Готово!',
                description: 'Регистрация прошла успешно.'
            })
            console.log(response.data);
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
            fetchReg(data)
            reset()
        } catch (error) {
            console.log('Ошибка: ', error);
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
                        type={alertProps.type}
                        message={alertProps.message}
                        description={alertProps.description}
                        showIcon />
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
                    <Text className='title'>Зарегистрироваться</Text>
                </ConfigProvider>
                <Flex justify='space-between' align='center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}
                    >
                        <Text className='label-reg'>username</Text>
                    </ConfigProvider>
                    <Controller
                        name='username'
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
                                <Input {...field} placeholder='example' />
                            </ConfigProvider>
                        )}
                    />
                </Flex>
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#00b39b',
                            fontSize: 16
                        }
                    }}
                >
                    <Text className='error-text'>{errors.username?.message}</Text>
                </ConfigProvider>
                <Flex justify='space-between' align='center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}
                    >
                        <Text className='label-reg'>email</Text>
                    </ConfigProvider>
                    <Controller
                        name='email'
                        control={control}
                        rules={{
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: 'Некорректный формат E-mail'
                            },
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
                                        colorWarningBg: 'rgb(33, 21, 43, 0.04)'
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
                                <Input {...field} placeholder='example@example.com' />
                            </ConfigProvider>
                        )}
                    />
                </Flex>
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
                <Flex justify='space-between' align='center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}>
                        <Text className='label-reg'>password</Text>
                    </ConfigProvider>
                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: 'Поле обязательно для заполнения',
                            minLength: 6,
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
                                <Input {...field} placeholder='Example' />
                            </ConfigProvider>
                        )}
                    />
                </Flex>
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#00b39b',
                            fontSize: 16
                        }
                    }}
                >
                    <Text className='error-text'>{errors.password?.message}</Text>
                </ConfigProvider>
                <Flex justify='space-between' align='center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}
                    >
                        <Text className='label-reg'>gender</Text>
                    </ConfigProvider>
                    <Controller
                        name='gender'
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
                                        colorBorder: '#892ad6',
                                        colorBgContainer: '#892ad6',
                                        colorText: 'white',
                                        controlHeight: 40,
                                        colorBgContainerDisabled: '#892ad6',
                                        colorPrimary: 'white',
                                        fontSize: 20
                                    },
                                    components: {
                                        Button: {
                                            colorTextDisabled: '#aaaaaa',
                                        }
                                    }
                                }}
                            >
                                <Group {...field}>
                                    <Button style={{
                                        margin: '0 2px'
                                    }} value='male'>Male</Button>
                                    <Button style={{
                                        margin: '0 2px'
                                    }} value='female'>Female</Button>
                                </Group>
                            </ConfigProvider>
                        )}
                    />
                </Flex>
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#00b39b',
                            fontSize: 16
                        }
                    }}
                >
                    <Text className='error-text'>{errors.gender?.message}</Text>
                </ConfigProvider>
                <Flex justify='space-between' align='center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: 'white',
                                fontSize: 20,
                            }
                        }}
                    >
                        <Text className='label-reg'>age</Text>
                    </ConfigProvider>
                    <Controller
                        name='age'
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
                                }}>
                                <Input {...field} placeholder='28' />
                            </ConfigProvider>
                        )}
                    />
                </Flex>
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#00b39b',
                            fontSize: 16
                        }
                    }}
                >
                    <Text className='error-text'>{errors.age?.message}</Text>
                </ConfigProvider>
                <Flex justify='center' align='center'>
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
                                colorPrimary: 'white',
                                fontSize: 22
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
                        <Button type='submit' onClick={handleSubmit(onSubmit)}>Sign Up</Button>
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
                <Text>Already have an account?
                    <Link to='/login'><Text underline>Log In</Text></Link>
                </Text>
            </ConfigProvider>
        </div>
    )
}

export default RegForm