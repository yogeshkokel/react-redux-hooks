import React from 'react';
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import i18n from '../../plugins/i18n';
import { withNamespaces } from 'react-i18next';
import { useCookies } from 'react-cookie';
function Header({ t }) {

    const changeLanguage = (lng) => {
        let stylesSheets = document.styleSheets;
        let lastStyleSheet = document.styleSheets[stylesSheets.length - 1];
        if (lng === "ar") {
            require('../../arabic.css');
            lastStyleSheet.disabled = false;
            document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        } else {
            lastStyleSheet.disabled = true;
            document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        }
        i18n.changeLanguage(lng);
    }

    const [cookies, setCookie, removeCookie] = useCookies();
    return (
        <div>
            <Nav variant="pills" className="justify-content-center" defaultActiveKey="link-1">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link eventKey="link-2" as={Link} to="/todos">Todos</Nav.Link>
                </Nav.Item>
                <div className="d-flex div-right">
                    <div onClick={() => changeLanguage('en')}>EN</div>|
                    <div onClick={() => changeLanguage('ar')}>AR</div>
                </div>
            </Nav>
            {
                cookies.tokenName
                    ?
                    <div onClick={() => removeCookie('tokenName')} className="text-center">Logout remove cookie</div>
                    :
                    <div onClick={() => setCookie('tokenName', 'someValue')} className="text-center">Login with cookie</div>
            }
            <div className="text-center mt-2">
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('es')}>Spanish</button>
            </div>
        </div>
    );
}

export default withNamespaces()(Header);