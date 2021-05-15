import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {}

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [,login] = useLoginMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({ options: values}); // spinner is spinning forever because we are not returning a promise
                    if(response.data?.login.errors) {
                        // the reason why we don't need question mark here is typescript gonna infer that this is defined, because we have a statement in if condition
                        setErrors(toErrorMap(response.data.login.errors)); 
                    } else if (response.data?.login.user) {
                        // worked
                        router.push("/")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Login;