'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SafeUser } from '../../../types';
import React from 'react';

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/cart');
      router.refresh();
    }
  }, []);
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push('/cart');
        router.refresh();
        toast.success('Logged In');
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  if (currentUser) {
    return <p className="text-center">Logged In Redirecting...</p>;
  }
  return (
    <>
      <Heading title="Sun up for E -> Shop" />
      <Button
        outline
        label="Sign up with google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn('google')}}
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account ?{' '}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
