export const getUniqueItems = <T extends { id: number }>(
    firstArray: T[],
    secondArray: T[]
) => {
    const firstArrayIds = new Set(firstArray.map((item) => item.id))

    return secondArray.filter((item) => !firstArrayIds.has(item.id))
}
