'use client'

import { X } from 'lucide-react'

import type { Recommendation } from '@/api/recommendations/recommendations.type'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Input } from '@/components/ui/input'

interface ProductRecommendationProps {
    recommendations: Recommendation[]
    setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>
}

export const ProductRecommendation = ({
    setRecommendations,
    recommendations
}: ProductRecommendationProps) => {
    const addRecommendation = () => {
        setRecommendations([...recommendations, { color: '#ffffff', title: '', id: -1 }])
    }

    const removeRecommendation = (idx: number) => {
        setRecommendations(recommendations.filter((_, i) => i !== idx))
    }

    const updateRecommendation = (idx: number, updatedRecommendation: Recommendation) => {
        setRecommendations(
            recommendations.map((v, i) => (i === idx ? updatedRecommendation : v))
        )
    }

    return (
        <div className='flex flex-col gap-y-4'>
            {recommendations.length > 0 &&
                recommendations.map((recommendation, idx) => (
                    <Recommendation
                        key={idx}
                        recommendation={recommendation}
                        updateRecommendation={(updatedRecommendation) =>
                            updateRecommendation(idx, updatedRecommendation)
                        }
                        removeRecommendation={() => removeRecommendation(idx)}
                    />
                ))}
            <Button
                onClick={addRecommendation}
                type='button'
                className='w-full'>
                Додати рекомендацію
            </Button>
        </div>
    )
}

interface RecommendationProps {
    recommendation: Recommendation
    removeRecommendation: () => void
    updateRecommendation: (recommendation: Recommendation) => void
}

const Recommendation = ({
    recommendation,
    removeRecommendation,
    updateRecommendation
}: RecommendationProps) => {
    const { color, title } = recommendation

    return (
        <div className='relative flex items-center gap-x-2 rounded-md border p-2'>
            <ColorPicker
                onChange={(color) => updateRecommendation({ ...recommendation, color })}
                value={color}
            />
            <Input
                onChange={(e) =>
                    updateRecommendation({
                        ...recommendation,
                        title: e.target.value
                    })
                }
                value={title}
                className='flex-1'
                type='text'
                placeholder='Введіть рекомендацію'
            />

            <Button
                onClick={removeRecommendation}
                type='button'
                variant='outline'
                className='absolute -right-2 -top-2 size-6 rounded-full p-1'>
                <X className='size-3' />
                <span className='sr-only'>Видалити рекомендацію</span>
            </Button>
        </div>
    )
}
