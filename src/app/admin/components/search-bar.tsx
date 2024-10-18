'use client'

import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'

// interface SearchBarProps {
//     search: string
//     setSearch: React.Dispatch<React.SetStateAction<string>>
// }

export const SearchBar = () => {
    const [search, setSearch] = useQueryState('search', {
        shallow: false,
        defaultValue: ''
    })

    const handleSearch = useDebouncedCallback((term: string) => {
        if (term) {
            setSearch(term)
        } else {
            setSearch(null)
        }
    }, 150)

    return (
        <div className='relative'>
            <Search className='absolute top-1/2 ml-4 size-5 -translate-y-1/2 text-secondary' />
            <Input
                type='text'
                className='px-14 pl-12 text-xl'
                placeholder='Пошук'
                defaultValue={search ?? ''}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}
