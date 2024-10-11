'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { object, string } from 'zod'

import { login } from '@/api/login/login'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCustomForm } from '@/hooks/use-custom-form'
import { isErrorWithMessage } from '@/util/is-error-with-message'

export const loginSchema = object({
    email: string().min(1, "Це поле є обов'язковим").email(),
    password: string()
        .min(1, "Це поле є обов'язковим")
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        )
})

type LoginFormValues = Zod.infer<typeof loginSchema>

export const LoginForm = () => {
    const form = useCustomForm(loginSchema, { email: '', password: '' })

    const [error, setError] = useState('')

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (data: LoginFormValues) => login(data),
        onSuccess: () => {
            router.push('/admin')
            form.reset()
        },
        onError: (error) => {
            const isErrorMessage = isErrorWithMessage(error)
            setError(isErrorMessage ? error.message : 'Щось пішло не так')
        }
    })

    const onLogin = (formData: LoginFormValues) => mutation.mutate(formData)

    return (
        <>
            <Form {...form}>
                <form
                    className='space-y-5'
                    onSubmit={form.handleSubmit(onLogin)}>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className='text-lg'>Пошта</FormLabel> */}
                                <FormControl>
                                    <Input
                                        placeholder='Пошта'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className='text-lg'>Пароль</FormLabel> */}
                                <FormControl>
                                    <Input
                                        placeholder='Пароль'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className='w-full cursor-pointer rounded-full border border-[#63DA9D] bg-[#0A2015] text-2xl text-primary shadow-[3px_4px_0px_0px_#17432C] transition-all hover:bg-[#182E23] hover:shadow-none'
                        type='submit'>
                        {mutation.isLoading ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            'Увійти'
                        )}
                    </Button>
                </form>
            </Form>
            {error ? (
                <div className='rounded-md bg-destructive/15 p-4 text-sm font-bold text-destructive'>
                    {error}
                </div>
            ) : null}
        </>
    )
}
