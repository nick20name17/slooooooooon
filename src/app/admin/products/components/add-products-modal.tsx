'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { productsSchema } from '../../../../config/schemas'
import { transliterate } from '../../utils/transliterate'

import { FilePicker } from './file-picker'
import { ProductRecommendation } from './product-recommendation'
import { ProductVariant } from './product-variant'
import type { Category } from '@/api/categories/categories.type'
import { clientApi } from '@/api/client'
import { addProduct, addProductImage, addProductThumbnail } from '@/api/products/products'
import { addRecommendation } from '@/api/recommendations/recommendations'
import { addVariant } from '@/api/variants/variants'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useCustomForm } from '@/hooks/use-custom-form'

type ProductsFormValues = Zod.infer<typeof productsSchema>

const generateSlug = (name: string) => {
    return transliterate(name)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
}

export const AddProductsModal = () => {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const form = useCustomForm(productsSchema, {
        title: '',
        slug: '',
        year: '',
        category: '',
        description: '',
        full_description: '',
        thumbnail: [],
        images: [],
        recommendations: [],
        variants: []
    })

    const { title, recommendations, variants, images, thumbnail } = form.watch()

    useEffect(() => {
        form.setValue('slug', generateSlug(title))
    }, [title])

    const mutation = useMutation({
        mutationFn: (
            data: Omit<
                ProductsFormValues,
                'thumbnail' | 'recommendations' | 'variants' | 'images'
            >
        ) => addProduct(data),
        onSuccess: (response) => {
            variants.forEach(async (v) => {
                addVariant({
                    ...v,
                    product: response?.id!
                })
            })

            recommendations.forEach(async (v) => {
                addRecommendation({
                    ...v,
                    product: response?.id!
                })
            })

            const imagesFormData = new FormData()

            images.forEach((img) => {
                imagesFormData.append('image', img as File)
            })

            if (images.length > 0) {
                addProductImage(response?.id!, imagesFormData)
            }

            const thumbnailFormData = new FormData()
            thumbnailFormData.append('thumbnail', thumbnail[0] as File)

            addProductThumbnail(response?.id!, thumbnailFormData)

            toast.success('Товар успішно доданий')
            form.reset()
            setOpen(false)
            router.refresh()
        }
    })

    const { data: categories } = useQuery({
        queryFn: () => clientApi<Category[]>('/categories')
    })

    const onProductAdd = (formData: ProductsFormValues) => {
        const { thumbnail, images, recommendations, variants, ...rest } = formData

        mutation.mutate(rest)
    }

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size='lg'
                    variant='outline'
                    className='rounded-full border-blue bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#0a84ff] transition-all hover:bg-blue/15 hover:drop-shadow-none'>
                    <PlusCircle className='mr-2 size-4 text-blue' />
                    Новий товар
                </Button>
            </SheetTrigger>
            <SheetContent className='min-w-[70vw] bg-primary-foreground/70 backdrop-blur-[5.5px]'>
                <SheetHeader>
                    <SheetTitle>Додати товар</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form
                        noValidate
                        className='mt-10 flex h-[90%] flex-col justify-between gap-4'
                        onSubmit={form.handleSubmit(onProductAdd)}>
                        <ScrollArea className='h-full border-b pb-4'>
                            <div className='h-full space-y-5 px-4 pb-1'>
                                <div className='flex gap-x-4'>
                                    <FormField
                                        control={form.control}
                                        name='title'
                                        render={({ field }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel className='text-lg'>
                                                    Назва товару
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Пес'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='slug'
                                        render={({ field }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel className='text-lg'>
                                                    Slug
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='43534534'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex gap-x-4'>
                                    <FormField
                                        control={form.control}
                                        name='year'
                                        render={({ field }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel className='text-lg'>
                                                    Рік
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        min={0}
                                                        type='number'
                                                        inputMode='numeric'
                                                        placeholder='2024'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='category'
                                        render={({ field }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel className='text-lg'>
                                                    Категорія
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Оберіть категорію' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories?.map(
                                                            (category: any) => (
                                                                <SelectItem
                                                                    key={category.id}
                                                                    value={category.id.toString()}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name='thumbnail'
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel className='text-lg'>
                                                Обкладинка товару
                                            </FormLabel>
                                            <FormControl>
                                                <FilePicker
                                                    multiple={false}
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='images'
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel className='text-lg'>
                                                Зображення
                                            </FormLabel>
                                            <FormControl>
                                                <FilePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel className='text-lg'>
                                                Короткий опис
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Короткий опис'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='full_description'
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel className='text-lg'>
                                                Повний опис
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Повний опис'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='variants'
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel className='text-lg'>
                                                Варіація товару
                                            </FormLabel>
                                            <FormControl>
                                                <ProductVariant
                                                    variants={field.value}
                                                    setVariants={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='recommendations'
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
                                            <FormLabel className='text-lg'>
                                                Рекомендації
                                            </FormLabel>
                                            <FormControl>
                                                <ProductRecommendation
                                                    recommendations={field.value}
                                                    setRecommendations={field.onChange}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </ScrollArea>

                        <Button
                            disabled={mutation.isLoading}
                            type='submit'
                            className='w-20 self-end'>
                            {mutation.isLoading ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                                'Додати'
                            )}
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
