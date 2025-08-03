import React from 'react';
import logo from '../../../../../assets/logo.png';

const ProfastLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="loading" />
            <h1 className='font-bold -ml-3 text-3xl'>Profast</h1>
        </div>
    );
};

export default ProfastLogo;