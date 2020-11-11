import React from 'react';

import '../assets/sass/list.scss';
import Company from '../components/Company';
function Home(){
    return(
        <div className="main">
            <div className="list">
                <Company />
            </div>
            
        </div>
    )
}

export default Home;