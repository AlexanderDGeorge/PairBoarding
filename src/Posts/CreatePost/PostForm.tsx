import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import DatePicker from './DatePicker';
import styled from 'styled-components';
import { StyledField } from '../../styled-components/StyledField';
import { DIFFICULTIES, LANGUAGES } from '../util/constants';
import LoadingBar from '../../Components/Animated/LoadingBar';
import { ModalContext } from '../../Application';
import {
    StyledButton,
    StyledButtonRow,
    StyledCancelButton,
} from '../../styled-components/StyledButtons';

export default function PostForm(props: {
    validate: any;
    handleSubmit: any;
    status: string;
}) {
    const { status, validate, handleSubmit } = props;
    const { handleModal } = useContext(ModalContext)!;

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                difficulty: '',
                language: '',
                start_date: new Date(),
            }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ isValid, handleChange, handleBlur, values, setFieldValue }) => (
                <CreatePairboard>
                    <StyledField>
                        <label htmlFor="title">title</label>
                        <Field
                            type="text"
                            name="title"
                            placeholder="LeetCode Problems in JavaScript"
                            autoFocus
                        />
                        <ErrorMessage name="title" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="difficulty">difficulty</label>
                        <select
                            name="difficulty"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="">select a difficulty</option>
                            {DIFFICULTIES.map((difficulty, i) => (
                                <option key={i} value={difficulty}>
                                    {difficulty}
                                </option>
                            ))}
                        </select>
                        <ErrorMessage name="difficulty" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="language">language</label>
                        <select
                            name="language"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="">select a language</option>
                            {LANGUAGES.map((language, i) => (
                                <option key={i} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <ErrorMessage name="language" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="description">description</label>
                        <textarea
                            style={{ minHeight: 100 }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="description"
                            placeholder="What do you want to accomplish?"
                        ></textarea>
                        <ErrorMessage name="description" component="p" />
                    </StyledField>
                    <DatePicker
                        value={values.start_date}
                        setFieldValue={setFieldValue}
                    />

                    <StyledButton
                        disabled={!isValid || status === 'loading'}
                        type="submit"
                    >
                        {status === 'loading' ? <LoadingBar /> : 'Create Post'}
                    </StyledButton>
                </CreatePairboard>
            )}
        </Formik>
    );
}

const CreatePairboard = styled(Form)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
