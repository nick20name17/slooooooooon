import { Skeleton } from '@/components/ui/skeleton'

export const CatalogueSkeleton = () => {
    return (
        <div className='mt-10'>
            <Skeleton className='mx-auto h-16 w-[884px] rounded-full' />

            <div className='mt-10 grid grid-cols-3 gap-5 rounded-[30px] bg-[#e6ddb9] p-5'>
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
                <Skeleton className='h-[526px] w-full rounded-[30px] bg-[#d2caa8]' />
            </div>
        </div>
    )
}
