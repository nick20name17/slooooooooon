import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(key)
            return value ? (JSON.parse(value) as T) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
            setState(valueToStore)

            window.dispatchEvent(new Event('storage'))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const value = window.localStorage.getItem(key)
                setState(value ? (JSON.parse(value) as T) : initialValue)
            } catch (error) {
                console.error(error)
                setState(initialValue)
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [key, initialValue])

    return [state, setValue] as const
}
