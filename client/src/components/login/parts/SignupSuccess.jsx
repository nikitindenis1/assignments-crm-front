import React from 'react';
import SmallLoader from '../../../parts/SmallLoader';

const SignupSuccess = (props) => {
    const {active} = props
    return (
        <div 
       id={active ? 'login__signup__success--active'  :''}
        className='login__signup__success flex__column'>
                <h2>Congradulation!</h2>
            <h3>Youre account created successfully!</h3>
            <p>Redirecting you to the application...</p>
            <SmallLoader />
        </div>
    )

}
export default SignupSuccess