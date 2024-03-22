import React from 'react';

const Contact = () => {

    return <>

        <div className="container d-flex justify-content-center align-items-center py-5 mt-5">
            <div className='container rounded-3 shadow w-50 overflow-x-hidden'>
                <h2 className='fw-bold text-center mt-5'>Contact us</h2>
                <p className="text-muted text-center">You can contact us on of the following methods</p>
                <p className='text-center mb-5'><i className='fa-solid fa-envelope fa-xl 'style={{color: "#000000"}}></i> mps.team.software@gmail.com</p>
            </div>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-5">
            <div className='rounded-3 w-50 overflow-x-hidden'>
                <h2 className='fw-bold text-center text-muted'>Uni App</h2>
                <h6 className="text-muted text-center text-muted">2023-2024</h6>
                <h6 className='text-center text-muted'>V1.0</h6>
            </div>
        </div>
        

    </>
}

export default Contact;
