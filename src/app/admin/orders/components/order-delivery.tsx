'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { getCities, getWarehouses } from '@/api/delivery/delivery'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface OrderDeliveryProps {
    deliveryType: string
    setDeliveryType: (value: string) => void
}

export const OrderDelivery = ({ setDeliveryType, deliveryType }: OrderDeliveryProps) => {
    return (
        <Select
            onValueChange={setDeliveryType}
            defaultValue={deliveryType}>
            <SelectTrigger>
                <SelectValue placeholder='Виберіть тип доставки' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='self'>Самовивіз з міста Рівне</SelectItem>
                <SelectItem value='nova-poshta'>Доставка новою поштою</SelectItem>
            </SelectContent>
        </Select>
    )
}

interface OrderCityProps {
    city: string
    deliveryType: string
    setCity: React.Dispatch<React.SetStateAction<string>>
    setCityLabel: React.Dispatch<React.SetStateAction<string>>
}

export const OrderCity = ({
    city,
    setCity,
    setCityLabel
    // deliveryType
}: OrderCityProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
        // setCity('')
    }, 250)

    const { data, isLoading, isFetching } = useQuery({
        queryFn: () => getCities({ search }),
        queryKey: ['cities', search]
    })

    const options = useMemo(() => {
        if (data?.data) {
            return data?.data.map((city) => ({
                value: city.Ref,
                label: city.Description
            }))
        }
        return []
    }, [data?.data])

    // useEffect(() => {
    //     return () => {
    //         setCity('')
    //     }
    // }, [deliveryType])

    return (
        <Popover
            modal
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between'>
                    {city
                        ? options?.find((option) => option.value === city)?.label
                        : 'Виберіть населений пункт'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-96 p-0'>
                <Command>
                    <div
                        className='flex items-center border-b px-3'
                        cmdk-input-wrapper=''>
                        <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                        <input
                            defaultValue={search}
                            className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                            onChange={(e) => handleSearch(e.currentTarget.value)}
                            placeholder='Введіть назву населеного пункту'
                        />
                    </div>

                    {isFetching || isLoading ? (
                        <div className='py-6 text-center text-sm'>Завантаження...</div>
                    ) : options?.length > 0 ? (
                        <CommandList>
                            <CommandGroup>
                                {options?.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            setCity(
                                                currentValue === city ? '' : currentValue
                                            )

                                            setCityLabel(
                                                options.find(
                                                    (option) =>
                                                        option.value === currentValue
                                                )?.label!
                                            )

                                            setOpen(false)
                                        }}>
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                city === option.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    ) : (
                        <CommandEmpty>Населенний пункт не знайдено</CommandEmpty>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    )
}

interface OrderWarehousesProps {
    city: string
    warehouses: string
    setWarehouses: React.Dispatch<React.SetStateAction<string>>
    setWarehouseLabel: React.Dispatch<React.SetStateAction<string>>
}

export const OrderWarehouses = ({
    city,
    warehouses,
    setWarehouses,
    setWarehouseLabel
}: OrderWarehousesProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
        // setWarehouses('')
    }, 250)

    const { data, isLoading, isFetching } = useQuery({
        queryFn: () => getWarehouses({ search, city }),
        queryKey: ['warehouses', search, city]
    })

    const options = useMemo(() => {
        if (data?.data) {
            return data?.data.map((city) => ({
                value: city.Ref,
                label: city.Description
            }))
        }
        return []
    }, [data?.data, city])

    // useEffect(() => {
    //     setWarehouses('')
    // }, [city])

    return (
        <Popover
            modal
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={!city}
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between'>
                    {warehouses
                        ? options?.find((option) => option.value === warehouses)?.label
                        : 'Виберіть відділення або поштомат'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-96 p-0'>
                <Command>
                    <div
                        className='flex items-center border-b px-3'
                        cmdk-input-wrapper=''>
                        <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                        <input
                            defaultValue={search}
                            className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                            onChange={(e) => handleSearch(e.currentTarget.value)}
                            placeholder='Введіть назву відділення або поштомату'
                        />
                    </div>

                    <ScrollArea className='h-[300px] overflow-auto'>
                        {isFetching || isLoading ? (
                            <div className='py-6 text-center text-sm'>
                                Завантаження...
                            </div>
                        ) : options?.length > 0 ? (
                            <CommandList>
                                <CommandGroup className='overflow-scroll'>
                                    {options?.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                setWarehouses(
                                                    currentValue === warehouses
                                                        ? ''
                                                        : currentValue
                                                )
                                                setWarehouseLabel(
                                                    options.find(
                                                        (option) =>
                                                            option.value === currentValue
                                                    )?.label!
                                                )
                                                setOpen(false)
                                            }}>
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    warehouses === option.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        ) : (
                            <CommandEmpty>
                                Відділення або поштомат не знайдено
                            </CommandEmpty>
                        )}
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
