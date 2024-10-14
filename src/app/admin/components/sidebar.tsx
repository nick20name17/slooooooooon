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
        <aside className='h-full w-60 rounded-3xl border p-5 max-lg:w-24'>
            <nav className='flex h-full flex-col justify-between'>
                <ul className='flex flex-col gap-y-4'>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden',
                                pathname === '/admin/orders' ? 'border-green' : ''
                            )}
                            asChild>
                            <Link href='/admin/orders'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-green max-lg:mr-0'>
                                    <ShoppingBag className='size-3' />
                                </div>
                                <span>Замовлення</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden',
                                pathname === '/admin/products' ? 'border-blue' : ''
                            )}
                            asChild>
                            <Link href='/admin/products'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-blue max-lg:mr-0'>
                                    <Archive className='size-3' />
                                </div>
                                <span>Товари</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden',
                                pathname === '/admin/customers' ? 'border-sand' : ''
                            )}
                            asChild>
                            <Link href='/admin/customers'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-sand max-lg:mr-0'>
                                    <UsersRound className='size-3' />
                                </div>
                                <span>Клієнти</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden',
                                pathname === '/admin/categories' ? 'border-seeblue' : ''
                            )}
                            asChild>
                            <Link href='/admin/categories'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-seeblue max-lg:mr-0'>
                                    <LayoutGrid className='size-3' />
                                </div>
                                <span>Категорії</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden',
                                pathname === '/admin/costs' ? 'border-red' : ''
                            )}
                            asChild>
                            <Link href='/admin/costs'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-red max-lg:mr-0'>
                                    <CircleDollarSign className='size-3' />
                                </div>
                                <span>Витрати</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='outline'
                            size='sm'
                            className={cn(
                                'w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden',
                                pathname === '/admin/profile' ? 'border-purple' : ''
                            )}
                            asChild>
                            <Link href='/admin/profile'>
                                <div className='mr-4 flex size-5 items-center justify-center rounded bg-purple max-lg:mr-0'>
                                    <UserRound className='size-3' />
                                </div>
                                <span>Профайл</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
                <SignOut />
            </nav>
        </aside>
    )
}
