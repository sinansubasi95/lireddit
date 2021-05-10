import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={async (values) => {
                    const response = await register(values); // spinner is spinning forever because we are not returning a promise
                    response.data.register?.user?.id
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
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;