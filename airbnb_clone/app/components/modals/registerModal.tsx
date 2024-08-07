'use client';
import axios from 'axios';
import { AiFillGithub} from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Heading from '../heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import Button from '../button';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './modal';
import { signIn } from 'next-auth/react';


const RegisterModal = () => {
    const registarModal = useRegisterModal();
    const loginModal = useLoginModal();
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
        try {
            axios.post('/api/register', data).then((response) => {
                registarModal.onClose();
            });
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIslLoading(false);
        }
    }

    const toggle = useCallback(() => {
      registarModal.onClose();
      loginModal.onOpen();
      [loginModal, registarModal]
    }, []);

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
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required 
                />
        </div>
    )

    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
        />
        <div className="text-neutral-500 text-center mt-4 font-light">
          <div className="justify-center flex flex-row items-center gap-2">
            Already have an account?
            <div
              onClick={toggle}
              className="text-neutral-800 cursor-pointer hover:underline"
            >
              Login
            </div>
          </div>
        </div>
      </div>
    );


    return(
            <Modal
            disabled={isLoading}
            isOpen={registarModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registarModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
            />
    )
}

export default RegisterModal;