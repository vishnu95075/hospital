import React from 'react';
import './Hospital.css';
import HospitalForm from './HospitalForm/HospitalForm';
import HospitalTable from './HospitalTable/HospitalTable';

const Hospital = () => {

    return (
        <>
            <div className='hospital'>
                <HospitalForm />
            </div>
            <HospitalTable />

        </>
    );
}

export default Hospital;
