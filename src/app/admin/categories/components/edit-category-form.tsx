'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { categorySchema } from '../../config/schemas'

import { updateCategory } from '@/api/categories/categories'
import type { Category } from '@/api/categories/categories.type'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCustomForm } from '@/hooks/use-custom-form'
import { cn } from '@/lib/utils'

type CategoryFormValues = Zod.infer<typeof categorySchema>

interface EditCategoryProps {
    category: Category
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditCategoryForm = ({
    category,
    isEditing,
    setIsEditing
}: EditCategoryProps) => {
    const router = useRouter()

    const form = useCustomForm(categorySchema, {
        name: category.name
    })

    const name = form.watch('name')

    const mutation = useMutation({
        mutationFn: (data: CategoryFormValues) => updateCategory(category.id, data),
        onSuccess: () => {
            setIsEditing(false)
            toast.success('Категорія успішно змінена')
            router.refresh()
        }
    })

    const onCategoryAdd = (formData: CategoryFormValues) => {
        mutation.mutate(formData)
    }

    return (
        <Form {...form}>
            <form
                className={cn('items-center gap-x-2', isEditing ? 'flex' : 'hidden')}
                onSubmit={form.handleSubmit(onCategoryAdd)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder='Введіть назву категорії'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={mutation.isLoading || !name.trim()}
                    type='submit'
                    className='w-28'>
                    {mutation.isLoading ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                        'Підтвердити'
                    )}
                </Button>
            </form>
        </Form>
    )
}
