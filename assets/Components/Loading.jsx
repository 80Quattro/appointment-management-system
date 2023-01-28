import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    
    return (
        <div className='position-absolute top-0 start-0 w-100 h-100' style={{zIndex: 2, background: 'rgba(0, 0, 0, 0.1)'}}>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    );

}
 
export default Loading;