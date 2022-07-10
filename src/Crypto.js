import React, {Component} from 'react';
import './Crypto.css';

import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {

    render() {
        return(
            <div clasName="Crypto">
                <CryptoList />
            </div>
        );
    }
}

export default Crypto;