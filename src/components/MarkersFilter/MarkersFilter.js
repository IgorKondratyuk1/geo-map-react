import React from 'react';
import {Button, Checkbox, Popover} from "antd";
import {useDispatch} from "react-redux";
import {toggleFilterMarkerType, toggleFilterProperties} from "../../redux/slices/filtersSlice";

function MarkersFilter({name = 'default',isMarkerType = true, icon, checkboxesArr }) {
    const dispatch = useDispatch();

    const onChange = (e) => {
        if (isMarkerType) {
            dispatch(toggleFilterMarkerType(e.target.filteredValue));
        } else {
            dispatch(toggleFilterProperties(e.target.filteredValue));
        }
    };

    const checkboxes = checkboxesArr.map((m, index) => {
        return ( <Checkbox key={index} filteredValue={m.value} onChange={onChange} defaultChecked={true}>{m.label}</Checkbox> )
    })

    const content = (
        <div style={{display: 'flex', flexDirection:'column'}}>
            {checkboxes}
        </div>
    )

    return (
        <Popover
            content={content}
            title={name}
            placement="right"
        >
            <Button shape="circle" style={{marginBottom: '10px'}} type="primary">{icon}</Button>
        </Popover>
    )
}

export default MarkersFilter;