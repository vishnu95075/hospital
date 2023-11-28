import React from 'react'
import { useLocation } from 'react-router-dom'
import BedForm from './BedForm/BedForm'
import './Bed.css';
import BedTable from './BedTable/BedTable';
const Bed = () => {
    const stateLocation = useLocation();
    const hospital = stateLocation.state;
    console.log(hospital);

    return (
        <>
            <div className='bed'>
                <BedForm hospital={hospital} />
            </div>
            <BedTable hospital={hospital} />

        </>
    )
}

export default Bed