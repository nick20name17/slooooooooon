interface CitiesQueryParams {
    search: string
}

interface WarehousesQueryParams {
    search: string
    city: string
}

const defaultLimit = 140

export interface Response {
    success: boolean
    data: Data[]
    errors: any[]
    warnings: any[]
    info: Info
    messageCodes: any[]
    errorCodes: any[]
    warningCodes: any[]
    infoCodes: any[]
}

export interface Data {
    Description: string
    DescriptionRu: string
    Ref: string
    Delivery1: string
    Delivery2: string
    Delivery3: string
    Delivery4: string
    Delivery5: string
    Delivery6: string
    Delivery7: string
    Area: string
    SettlementType: string
    IsBranch: string
    PreventEntryNewStreetsUser: string
    CityID: string
    SettlementTypeDescription: string
    SettlementTypeDescriptionRu: string
    SpecialCashCheck: number
    AreaDescription: string
    AreaDescriptionRu: string
}

export interface Info {
    totalCount: number
}

export const getCities = async (queryParams: CitiesQueryParams): Promise<Response> => {
    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        body: JSON.stringify({
            apiKey: '6b6fd19c1eef6e59f9f02090423fab01',
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
                FindByString: queryParams.search,
                Limit: defaultLimit
            }
        })
    })

    const data = await response.json()

    return data
}

export const getWarehouses = async (
    queryParams: WarehousesQueryParams
): Promise<Response> => {
    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        body: JSON.stringify({
            apiKey: '6b6fd19c1eef6e59f9f02090423fab01',
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: {
                FindByString: queryParams.search,
                CityRef: queryParams.city,
                Limit: defaultLimit
            }
        })
    })

    const data = await response.json()

    return data
}
