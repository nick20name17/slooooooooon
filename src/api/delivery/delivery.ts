import axios from "axios";
import type {
    CitiesQueryParams,
    DeliveryResponse,
    WarehousesQueryParams,
} from "./delivery.types";

const defaultLimit = 140;

const apiUrl = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = "6b6fd19c1eef6e59f9f02090423fab01";

export const getCities = async (
    queryParams: CitiesQueryParams
): Promise<DeliveryResponse> => {
    const response = await axios.post<DeliveryResponse>(apiUrl, {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
            FindByString: queryParams.search,
            Limit: defaultLimit,
        },
    });

    return response.data;
};

export const getWarehouses = async (
    queryParams: WarehousesQueryParams
): Promise<DeliveryResponse> => {
    const response = await axios.post<DeliveryResponse>(apiUrl, {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
            FindByString: queryParams.search,
            CityRef: queryParams.city,
            Limit: defaultLimit,
        },
    });

    return response.data;
};
