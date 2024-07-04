'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Heading from '../heading';
import Input from '../inputs/input';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './modal';


const RegisterModal = () => {
    const registarModal = useRegisterModal();
    const [isLoading, setIslLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name:'',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIslLoading(true);
        axios.post('/api/register', data).then((response) => {
            registarModal.onClose();
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setIslLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Welcome to Airbnb"
            subtitle="Create an account!"/>
                <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
                />
                <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
                />
                <Input
                id="passowrd"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
                />
        </div>
    )

    return(
            <Modal
            disabled={isLoading}
            isOpen={registarModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registarModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            />
    )
}

export default RegisterModal;