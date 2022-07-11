import React, {Component} from 'react';
import './Crypto.css';

import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: []
        };
    }

    componentDidMount() {
        this.getCryptoData();
        this.timerID = setInterval(() => this.getCryptoData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCryptoData = () => {

        axios.get('https://blockchain.info/ticker')
            .then(res => {
                const tickers = res.data;

                this.setState((state) => {
                    let newCryptoList = [];

                    for (const [ticker, cryptoRate] of Object.entries(tickers)) {
                        let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
                            return(cryptoObj.currency === ticker);
                        });

                        let newCryptoObj = {
                            currency: ticker, symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            sell: cryptoRate.sell,
                            lastRate: cryptoRate.last,
                        }

                        if (lastCryptoObj !== undefined) {
                            if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'green';
                                newCryptoObj.htmlArray = String.fromCharCode(8593);
                            } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'red';
                                newCryptoObj.htmlArray = String.fromCharCode(8595);
                            } else {
                                newCryptoObj.cssClass = 'blue';
                                newCryptoObj.htmlArray = String.fromCharCode(8596);
                            }
                        } else {
                            newCryptoObj.cssClass = 'blue';
                            newCryptoObj.htmlArray = String.fromCharCode(8596);
                        }

                        newCryptoList.push(newCryptoObj);
                    }

                    return({
                        cryptoList: newCryptoList
                    })
                });

                console.log(res.data);
            });
    }

    render() {
        return(
            <div className="Crypto">
                <CryptoList cryptoList={this.state.cryptoList}/>
            </div>
        );
    }
}

export default Crypto;