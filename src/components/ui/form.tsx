'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
    Controller,
    type ControllerProps,
    type FieldError,
    type FieldPath,
    type FieldValues,
    FormProvider,
    useFormContext
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const id = React.useId()

        return (
            <FormItemContext.Provider value={{ id }}>
                <div
                    ref={ref}
                    className={cn('space-y-2', className)}
                    {...props}
                />
            </FormItemContext.Provider>
        )
    }
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
})
FormDescription.displayName = 'FormDescription'

// const getErrorMessage = (error: FieldError | undefined) => {
//     if (Array.isArray(error)) {
//         return error
//             ?.map((err) => Object.values(err))
//             .map((group, index) => {
//                 const messages = group.map((err: any) => err?.message).join(', ')
//                 return `${index + 1}. ${messages}`
//             })
//             .join('\n')
//     }

//     return error?.message
// }

const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    if (Array.isArray(error)) {
        return error
            .map((err, index) => {
                const messages = Object.values(err)
                    .map((e: any) => getErrorMessage(e))
                    .join(', ')
                return `${index + 1}. ${messages}`
            })
            .join('\n')
    }

    if (typeof error === 'object' && error !== null) {
        if ('message' in error && typeof error.message === 'string') {
            return error.message
        }

        const nestedErrors = Object.values(error).some(
            (value) => typeof value === 'object'
        )

        if (nestedErrors) {
            return Object.entries(error)
                .map(([_, value]) => {
                    const nestedMessage = getErrorMessage(value as FieldError)
                    return nestedMessage ? nestedMessage : ''
                })
                .filter(Boolean)
                .join(' | ')
        }
    }

    return undefined
}

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? getErrorMessage(error) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn('text-sm font-medium text-destructive', className)}
            {...props}>
            {body}
        </p>
    )
})
FormMessage.displayName = 'FormMessage'

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField
}
