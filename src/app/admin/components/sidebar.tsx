'use client'

import {
    Archive,
    CircleDollarSign,
    LayoutGrid,
    ShoppingBag,
    UserRound,
    UsersRound
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SignOut } from './sign-out-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const SideBar = () => {
    const pathname = usePathname()

    return (
        <aside className='h-full w-60 rounded-3xl border p-5'>
            <nav className='flex h-full flex-col justify-between'>
                <ul className='flex flex-col gap-y-4'>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg',
                                pathname === '/admin/orders' ? 'border-green' : ''
                            )}
                            asChild>
                            <Link href='/admin/orders'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-green'>
                                    <ShoppingBag className='size-3' />
                                </div>
                                Замовлення
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg',
                                pathname === '/admin/products' ? 'border-blue' : ''
                            )}
                            asChild>
                            <Link href='/admin/products'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-blue'>
                                    <Archive className='size-3' />
                                </div>
                                Товари
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg',
                                pathname === '/admin/customers' ? 'border-sand' : ''
                            )}
                            asChild>
                            <Link href='/admin/customers'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-sand'>
                                    <UsersRound className='size-3' />
                                </div>
                                Клієнти
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg',
                                pathname === '/admin/categories' ? 'border-seeblue' : ''
                            )}
                            asChild>
                            <Link href='/admin/categories'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-seeblue'>
                                    <LayoutGrid className='size-3' />
                                </div>
                                Категорії
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg',
                                pathname === '/admin/costs' ? 'border-red' : ''
                            )}
                            asChild>
                            <Link href='/admin/costs'>
                                <div className='bg-red mr-4 flex size-5 items-center justify-center rounded'>
                                    <CircleDollarSign className='size-3' />
                                </div>
                                Витрати
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg',
                                pathname === '/admin/profile' ? 'border-purple' : ''
                            )}
                            asChild>
                            <Link href='/admin/profile'>
                                <div className='bg-purple mr-4 flex size-5 items-center justify-center rounded'>
                                    <UserRound className='size-3' />
                                </div>
                                Профайл
                            </Link>
                        </Button>
                    </li>
                </ul>
                <SignOut />
            </nav>
        </aside>
    )
}
