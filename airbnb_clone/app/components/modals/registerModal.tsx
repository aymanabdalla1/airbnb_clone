'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';

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

    return(
            <Modal
            disabled={isLoading}
            isOpen={registarModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registarModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            />
    )
}

export default RegisterModal;