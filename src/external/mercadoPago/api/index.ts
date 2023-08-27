import axios from "axios";
import { serverConfig } from "config";

export const mercadoPagoApi = axios.create({
    baseURL: serverConfig.mercadoPago.apiUrl,
    headers: {
        Authorization: `Bearer ${serverConfig.mercadoPago.token}`,
    },
});

export type MercadoPagoApi = typeof mercadoPagoApi;
