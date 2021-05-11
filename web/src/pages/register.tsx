import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [,register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register(values); // spinner is spinning forever because we are not returning a promise
                    if(response.data?.register.errors) {
                        // the reason why we don't need question mark here is typescript gonna infer that this is defined, because we have a statement in if condition
                        setErrors(toErrorMap(response.data.register.errors)); 
                    } else if (response.data?.register.user) {
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
                        <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;