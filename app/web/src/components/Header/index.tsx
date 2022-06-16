import React from 'react';

// import { Container } from './styles';

const Header: React.FC = ({ children }) => {
    return (
        <nav>
            <div>
                <div>
                    <div>
                        <a href="/#">Newscraper</a>
                    </div>
                    <div>
                        <button type="button" aria-label="toggle menu"></button>
                    </div>
                </div>

                <div>
                    <div></div>
                    <div>{children}</div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
