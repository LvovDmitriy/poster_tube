import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="appHeader">
                <h1><span className="blueHeader">Poster</span>Tube</h1>
            </div>
        );
    }
}

export default Header;