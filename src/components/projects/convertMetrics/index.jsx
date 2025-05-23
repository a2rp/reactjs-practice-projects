import React, { useState } from "react";
import {
    Container,
    MetricList,
    MetricName,
    MetricUnitContainer,
    Heading,
} from "./styled";
import AreaConverter from "./metricComponents/AreaConverter";
import DataTransferConverter from "./metricComponents/DataTransferConverter";
import DigitalStorageConverter from "./metricComponents/DigitalStorageConverter";
import EnergyConverter from "./metricComponents/EnergyConverter";
import FrequencyConverter from "./metricComponents/FrequencyConverter";
import FueleconomyConverter from "./metricComponents/FuelEconomyConverter";
import LengthConverter from "./metricComponents/LengthConverter";
import MassConverter from "./metricComponents/MassConverter";
import PlaneangleConverter from "./metricComponents/PlaneAngleConverter";
import PressureConverter from "./metricComponents/PressureConverter";
import SpeedConverter from "./metricComponents/SpeedConverter";
import TemperatureConverter from "./metricComponents/TemperatureConverter";
import TimeConverter from "./metricComponents/TimeConverter";
import VolumeConverter from "./metricComponents/VolumeConverter";

const metricTypes = [
    "area",
    "datatransfer",
    "digitalstorage",
    "energy",
    "frequency",
    "fueleconomy",
    "length",
    "mass",
    "planeangle",
    "pressure",
    "speed",
    "temperature",
    "time",
    "volume",
];

const displayName = (key) =>
    key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^\w/, (c) => c.toUpperCase());

const MetricConverter = () => {
    const [activeMetric, setActiveMetric] = useState("");

    return (
        <Container>
            <Heading>Convert Metrics</Heading>

            <MetricList>
                {metricTypes.map((metric) => (
                    <MetricName
                        key={metric}
                        className={metric}
                        $active={metric === activeMetric}
                        onClick={() => setActiveMetric(metric)}
                    >
                        {displayName(metric)}
                    </MetricName>
                ))}
            </MetricList>

            <MetricUnitContainer>
                {activeMetric === "area" && <AreaConverter />}
                {activeMetric === "datatransfer" && <DataTransferConverter />}
                {activeMetric === "digitalstorage" && (
                    <DigitalStorageConverter />
                )}
                {activeMetric === "energy" && <EnergyConverter />}
                {activeMetric === "frequency" && <FrequencyConverter />}
                {activeMetric === "fueleconomy" && <FueleconomyConverter />}
                {activeMetric === "length" && <LengthConverter />}
                {activeMetric === "mass" && <MassConverter />}
                {activeMetric === "planeangle" && <PlaneangleConverter />}
                {activeMetric === "pressure" && <PressureConverter />}
                {activeMetric === "speed" && <SpeedConverter />}
                {activeMetric === "temperature" && <TemperatureConverter />}
                {activeMetric === "time" && <TimeConverter />}
                {activeMetric === "volume" && <VolumeConverter />}

                {!activeMetric && <h1 style={{ textAlign: "center" }}>click any one above</h1>}
            </MetricUnitContainer>
        </Container>
    );
};

export default MetricConverter;
