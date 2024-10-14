'use client'

import { FileIcon, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { type FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

interface UploadedFile extends File {
    preview?: string
}

export interface UploadedUrl {
    url: string
    id: number
}

interface FilePickerProps {
    value?: (UploadedFile | UploadedUrl)[]
    onChange?: (files: (UploadedFile | UploadedUrl)[]) => void
    multiple?: boolean
}

export const FilePicker = ({
    value = [],
    onChange,
    multiple = true
}: FilePickerProps) => {
    const [files, setFiles] = useState<(UploadedFile | UploadedUrl)[]>(
        value?.map((file) =>
            'url' in file
                ? file
                : { ...file, preview: URL.createObjectURL(file as UploadedFile) }
        )
    )

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            )

            const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
            setFiles(updatedFiles)
            onChange?.(updatedFiles)

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file, errors }) => {
                    errors.forEach((error) => {
                        switch (error.code) {
                            case 'file-too-large':
                                toast.error(
                                    `Файл ${file.name} перевищує максимальний розмір у 5MB`
                                )
                                break
                            case 'file-invalid-type':
                                toast.error(`Файл ${file.name} має недопустимий тип`)
                                break
                            case 'too-many-files':
                                toast.error(
                                    'Забагато файлів. Будь ласка, виберіть лише один файл'
                                )
                                break
                            default:
                                toast.error(
                                    `Помилка з файлом ${file.name}: ${error.message}`
                                )
                        }
                    })
                })
            }
        },
        [files, onChange, multiple]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        accept: ALLOWED_FILE_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
        maxSize: MAX_FILE_SIZE
    })

    const removeFile = useCallback(
        (fileToRemove: UploadedFile | UploadedUrl) => {
            const updatedFiles = files?.filter((file) => file !== fileToRemove)
            setFiles(updatedFiles)
            onChange?.(updatedFiles)

            if ('preview' in fileToRemove && fileToRemove?.preview?.startsWith('blob:')) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
        },
        [files, onChange]
    )

    useEffect(() => {
        return () =>
            files?.forEach((file) => {
                if (
                    'preview' in file &&
                    file.preview &&
                    file.preview.startsWith('blob:')
                ) {
                    URL.revokeObjectURL(file.preview)
                }
            })
    }, [files])

    return (
        <Card>
            <CardContent
                {...getRootProps()}
                className={cn(
                    'h-36 cursor-pointer rounded-lg border p-6 text-center transition-colors',
                    files.length > 0
                        ? ''
                        : 'flex flex-col items-center justify-center gap-y-4',
                    isDragActive
                        ? 'border-primary'
                        : 'border-secondary hover:border-primary'
                )}>
                <input {...getInputProps()} />

                {files?.length > 0 ? (
                    <ul className='flex items-center justify-start gap-x-4'>
                        {files?.map((file) =>
                            'url' in file ? (
                                <li
                                    onClick={(e) => e.stopPropagation()}
                                    key={file.id}
                                    className='relative size-24'>
                                    {file.url ? (
                                        <Image
                                            width={96}
                                            height={96}
                                            src={file.url}
                                            alt={`Uploaded from URL ${file.id}`}
                                            className='size-full rounded-xl border object-cover'
                                        />
                                    ) : null}
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => removeFile(file)}
                                        className='absolute -right-2 -top-2 size-6 rounded-full p-1'>
                                        <X className='size-3' />
                                        <span className='sr-only'>
                                            Remove URL {file.url}
                                        </span>
                                    </Button>
                                </li>
                            ) : (
                                <li
                                    onClick={(e) => e.stopPropagation()}
                                    key={(file as UploadedFile).name}
                                    className='relative size-24'>
                                    {file?.type?.startsWith('image/') ? (
                                        <Image
                                            width={96}
                                            height={96}
                                            src={(file as UploadedFile).preview!}
                                            alt={(file as UploadedFile).name}
                                            className='size-full rounded-xl border object-cover'
                                            onLoad={() => {
                                                URL.revokeObjectURL(
                                                    (file as UploadedFile).preview!
                                                )
                                            }}
                                        />
                                    ) : (
                                        <FileIcon className='secondary size-6' />
                                    )}

                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => removeFile(file)}
                                        className='absolute -right-2 -top-2 size-6 rounded-full p-1'>
                                        <X className='size-3' />
                                        <span className='sr-only'>
                                            Remove {(file as UploadedFile).name}
                                        </span>
                                    </Button>
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <>
                        {isDragActive ? (
                            <p>Перетягніть файли сюди ...</p>
                        ) : (
                            <>
                                <Upload className='mx-auto size-6 text-secondary' />
                                <p>
                                    Перетягніть ваші файли сюди або натисніть щоб вибрати
                                    їх
                                </p>
                                <p className='text-xs text-secondary'>
                                    Дозволені типи: JPEG, PNG, WEBP, JPG. Макс.розмір: 5MB
                                </p>
                            </>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
