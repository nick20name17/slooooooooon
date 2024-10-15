import {
    array,
    discriminatedUnion,
    enum as enum_zod,
    instanceof as instanceof_zod,
    literal,
    number,
    object,
    string,
    union
} from 'zod'

export const categorySchema = object({
    name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const customerSchema = object({
    first_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    last_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    surname: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    phone: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    email: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .email({
            message: 'Введіть правильну адресу електронної пошти'
        })
})

const recommendationSchema = object({
    id: number({
        required_error: "Ідентифікатор рекомендації є обов'язковим"
    }),
    title: string({
        required_error: "Назва рекомендації є обов'язковою"
    }).min(1, "Назва рекомендації є обов'язковою"),
    color: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

const variantsSchema = object({
    id: number({
        required_error: "Ідентифікатор пакування є обов'язковим"
    }),
    packaging: string({
        required_error: "Пакування є обов'язковим"
    }).min(1, "Пакування є обов'язковим"),
    inventory: number({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    price: string({
        required_error: "Ціна є обов'язковою"
    }).min(1, "Ціна є обов'язковою")
})

const imageUrlSchema = object({
    id: number({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    url: string({
        required_error: "Це поле є обов'язковим"
    })
})

const imageFileSchema = instanceof_zod(File)

const imageSchema = union([imageFileSchema, imageUrlSchema])

export const productsSchema = object({
    title: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    slug: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    year: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    category: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    description: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    full_description: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    thumbnail: array(imageSchema).min(1, "Це поле є обов'язковим"),
    images: array(imageSchema).min(1, 'Завантажте хоча б 1 зображення'),
    recommendations: array(recommendationSchema).min(1, 'Додайте хоча б 1 рекомендацію'),
    variants: array(variantsSchema).min(1, 'Додайте хоча б 1 варіацію')
})

const orderItemSchema = object({
    id: number({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    amount: number({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

const deliveryTypeEnum = enum_zod(['self', 'nova-poshta'])

const baseOrderSchema = object({
    status: union([literal('raw'), literal('failed'), literal('completed')]),
    customer: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    comment: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    order_items: array(orderItemSchema).min(1, 'Додайте хоча б 1 товар')
})

const novaPoshtaOrderSchema = object({
    ...baseOrderSchema.shape,
    delivery_type: literal(deliveryTypeEnum.enum['nova-poshta']),
    city: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    warehouse: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

const selfOrderSchema = object({
    ...baseOrderSchema.shape,
    delivery_type: literal(deliveryTypeEnum.enum.self),
    city: string({
        required_error: "Це поле є обов'язковим"
    }).optional(),
    warehouse: string({
        required_error: "Це поле є обов'язковим"
    }).optional()
})

export const orderSchema = discriminatedUnion('delivery_type', [
    selfOrderSchema,
    novaPoshtaOrderSchema
])

export const checkoutSchema = orderSchema.and(customerSchema)
