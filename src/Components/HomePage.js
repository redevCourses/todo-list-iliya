import { Typography, Button, ConfigProvider } from 'antd'

const HomePage = () => {

    const { Text } = Typography

    return (
        <div className='home'>
            <ConfigProvider
                theme={{
                    token: {
                        colorText: 'white',
                        fontSize: 24
                    },
                    components: {
                        Button: {
                            paddingInline: 4
                        }
                    }
                }}
            >
                <Text>Hello! Have an account?<Button href='/login' type='link'><Text underline>Log In</Text></Button>! No? Please<Button href='/register' type='link'><Text underline>Sign Up</Text></Button>!</Text>
            </ConfigProvider>
        </div>
    )
}

export default HomePage;