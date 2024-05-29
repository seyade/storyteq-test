import React from "react";
import { render } from "@testing-library/react";
import VehicleList from "..";
import useData from "../useData";

jest.mock("../useData");

describe("<VehicleList /> Tests", () => {
    it("Should show loading state if it not falsy", () => {
        useData.mockReturnValue([true, "An error occurred", "results"]);
        const { queryByTestId } = render(<VehicleList />);

        expect(queryByTestId("loading")).not.toBeNull();
        expect(queryByTestId("error")).toBeNull();
        expect(queryByTestId("results")).toBeNull();
    });

    it("Should show error if it is not falsy and loading is finished", () => {
        useData.mockReturnValue([false, "An error occurred", "results"]);
        const { queryByTestId } = render(<VehicleList />);

        expect(queryByTestId("loading")).toBeNull();
        expect(queryByTestId("error")).not.toBeNull();
        expect(queryByTestId("results")).toBeNull();
    });

    it("Should show results if loading successfully finished", () => {
        useData.mockReturnValue([false, false, "results"]);
        const { queryByTestId } = render(<VehicleList />);

        expect(queryByTestId("loading")).toBeNull();
        expect(queryByTestId("error")).toBeNull();
        expect(queryByTestId("results")).not.toBeNull();
    });

    it("Should display results when loaded successfully", () => {
        const mockData = [
            {
                name: "fpace",
                description: "Jaguar's luxury performance SUV.",
                price: "£40,000",
                meta: {
                    passengers: 5,
                    drivetrain: ["AWD", "RWD"],
                    bodystyles: ["SUV"],
                    emissions: {
                        template: "CO2 Emissions $value g/km",
                        value: 100,
                    },
                },
                media: [
                    {
                        name: "vehicle",
                        url: "/images/16x9/fpace_k17.jpg",
                    },
                    {
                        name: "vehicle",
                        url: "/images/1x1/fpace_k17.jpg",
                    },
                ],
            },
        ];
        useData.mockReturnValue([false, false, mockData]);

        const { getByText } = render(<VehicleList />);

        expect(getByText("fpace")).toBeTruthy();
        expect(getByText("From £40,000")).toBeTruthy();
    });
});
