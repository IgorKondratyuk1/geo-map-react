import WaterMarkTemplate from "../components/InputTemplates/waterMarkTemplate";
import SoilMarkTemplate from "../components/InputTemplates/soilMarkTemplate";
import RadiationMarkTemplate from "../components/InputTemplates/radiationMarkTemplate";
import AirMarkTemplate from "../components/InputTemplates/airMarkTemplate";
import CompanyMarkTemplate from "../components/InputTemplates/companyMarkTemplate";
import React from "react";

const defaultComponent = <div>Something wrong...</div>;
const fields = [
    { name: "water_mark", component: <WaterMarkTemplate /> },
    { name: "soil", component: <SoilMarkTemplate /> },
    { name: "radiation", component: <RadiationMarkTemplate /> },
    { name: "air", component: <AirMarkTemplate /> },
    { name: "company", component: <CompanyMarkTemplate />},
];

export const getFormFields = (fieldName) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return defaultComponent;
    return field.component;
}