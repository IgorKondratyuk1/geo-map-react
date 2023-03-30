import React from 'react';
import MarkersFilter from "./MarkersFilter";
import {
    airParams,
    economicParams, energyParams,
    healthParams,
    markersType,
    radiationParams,
    soilParams,
    waterParams
} from "../../dictionariesData";
import waterLogo from '../../assets/filters-icons/water-solid.svg';
import filterLogo from '../../assets/filters-icons/filter-solid.svg';
import airLogo from '../../assets/filters-icons/wind-solid.svg';
import energyLogo from '../../assets/filters-icons/lightbulb-solid.svg';
import soilLogo from '../../assets/filters-icons/mountain-sun-solid.svg';
import radiationLogo from '../../assets/filters-icons/radiation-solid.svg';
import economicLogo from '../../assets/filters-icons/sack-dollar-solid.svg';
import healthLogo from '../../assets/filters-icons/suitcase-medical-solid.svg';
import CustomIcon from "../CustomIcon/CustomIcon";

function Filters(props) {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: 'flex-start'}}>
            <MarkersFilter icon={<CustomIcon iconLogo={filterLogo} />} isMarkerType={true} name='Загальні фільтри' checkboxesArr={markersType}/>
            <MarkersFilter icon={<CustomIcon iconLogo={airLogo} />} isMarkerType={false} name='Фільтр повітря' checkboxesArr={airParams}/>
            <MarkersFilter icon={<CustomIcon iconLogo={radiationLogo} />} isMarkerType={false} name='Фільтр радіація' checkboxesArr={radiationParams}/>
            <MarkersFilter icon={<CustomIcon iconLogo={soilLogo} />} isMarkerType={false} name='Фільтр грунт' checkboxesArr={soilParams}/>
            <MarkersFilter icon={<CustomIcon iconLogo={waterLogo} />} isMarkerType={false} name='Фільтр вода' checkboxesArr={waterParams}/>
            <MarkersFilter icon={<CustomIcon iconLogo={economicLogo} />} isMarkerType={false} name='Фільтр економічн.' checkboxesArr={economicParams}/>
            <MarkersFilter icon={<CustomIcon iconLogo={healthLogo} />} isMarkerType={false} name="Фільтр здоров'я" checkboxesArr={healthParams}/>
            <MarkersFilter icon={<CustomIcon iconLogo={energyLogo} />} isMarkerType={false} name='Фільтр енергетика' checkboxesArr={energyParams}/>
        </div>
    );
}

export default Filters;