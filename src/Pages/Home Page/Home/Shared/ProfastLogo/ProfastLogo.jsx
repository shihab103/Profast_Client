import React from 'react';
import logo from '../../../../../assets/logo.png';
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
        <Link to={'/'} className='flex items-end'>
            <img src={logo} alt="loading" />
            <h1 className='font-bold -ml-3 text-3xl'>Profast</h1>
        </Link>
    );
};

export default ProfastLogo;