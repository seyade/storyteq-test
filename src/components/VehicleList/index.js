import React from "react";
import useData from "./useData";
import "./style.scss";

export default function VehicleList() {
    // eslint-disable-next-line no-unused-vars
    const [loading, error, vehicles] = useData();

    if (loading) {
        return <div data-testid="loading">Loading</div>;
    }

    if (error) {
        return <div data-testid="error">{error}</div>;
    }

    return (
        <div className="VehicleList" data-testid="results">
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                    <div className="card" key={vehicle.name} data-testid="card">
                        <div className="card__image-box">
                            <img
                                className="card__image"
                                src={vehicle.media[1].url}
                                alt={vehicle.id}
                            />
                        </div>

                        <div className="card__content">
                            <p className="card__title">{vehicle.name}</p>
                            <p className="card__price">From {vehicle.price}</p>
                            <p className="card__description">
                                {vehicle.description}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <p>No vehicle</p>
                </div>
            )}
        </div>
    );
}
