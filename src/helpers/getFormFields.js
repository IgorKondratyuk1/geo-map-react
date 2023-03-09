import CompanyMarkTemplate from "../components/InputTemplates/companyMarkTemplate";
import React from "react";
import {
    airParams,
    economicParams, energyParams,
    healthParams,
    radiationParams,
    soilParams,
    wasteParams,
    waterParams
} from "../dictionariesData";
import InputTemplate from "../components/InputTemplates/InputTemplate";

const defaultComponent = <div>Something wrong...</div>;
const fields = [
    { name: "water", component: <InputTemplate selectParams={waterParams} markTypeName={'Водний'} markTypeValue={'water'} /> },
    { name: "soil", component: <InputTemplate selectParams={soilParams} markTypeName={'Грунтовий'} markTypeValue={'soil'} /> },
    { name: "radiation", component: <InputTemplate selectParams={radiationParams} markTypeName={'Радіаційний'} markTypeValue={'radiation'} /> },
    { name: "air", component: <InputTemplate selectParams={airParams} markTypeName={'Повітряний'} markTypeValue={'air'} /> },
    { name: "waste", component: <InputTemplate selectParams={wasteParams} markTypeName={'Відходи'} markTypeValue={'waste'} /> },
    { name: "economic", component: <InputTemplate selectParams={economicParams} markTypeName={'Економічний'} markTypeValue={'economic'} /> },
    { name: "health", component: <InputTemplate selectParams={healthParams} markTypeName={'Стан здоров\'я населення'} markTypeValue={'health'} /> },
    { name: "energy", component: <InputTemplate selectParams={energyParams} markTypeName={'Енергетичний стан'} markTypeValue={'energy'} /> },
    { name: "company", component: <CompanyMarkTemplate />},
];

export const getFormFields = (fieldName) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return defaultComponent;
    return field.component;
}