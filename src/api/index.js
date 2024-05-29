// eslint-disable-next-line no-unused-vars
import { request } from "./helpers";

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
    const regex = /problematic/i;

    try {
        const response = await fetch("/api/vehicles.json");
        const data = await response.json();

        const vehiclesData = data.map(async (d) => {
            if (!regex.test(d.apiUrl)) {
                const { id, apiUrl, media } = d;
                const res = await fetch(apiUrl);
                // const vres = await res.json();
                const { description, meta, price } = await res.json();

                const newPrice = typeof price !== "undefined" ? price : "";

                const newVehicle = {
                    name: id,
                    description,
                    price: newPrice,
                    meta,
                    media,
                };
                return newVehicle;
            }
            return null;
        });

        const results = await Promise.all(vehiclesData);
        return results
            .filter((result) => result !== null)
            .filter((vehicle) => vehicle.price !== "");
    } catch (error) {
        throw new Error(`VEHICLES_FETCH_ERROR: ${error}`);
    }
}
