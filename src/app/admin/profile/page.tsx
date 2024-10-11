import { UserRound } from 'lucide-react'

export const metadata = {
    title: 'Профайл'
}

const Costs = async () => {
    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-purple'>
                        <UserRound className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Профайл</h1>
                </div>
            </div>
            <div className='flex flex-col gap-y-7 p-5'></div>
        </>
    )
}

export default Costs
