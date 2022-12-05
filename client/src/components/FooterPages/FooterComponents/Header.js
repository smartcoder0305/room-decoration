import React from 'react'

function Header({name}) {
    return (
        <>
            <link rel="stylesheet" href="assets/css/style.css"></link>
            <header className="site-header fixed-top" style={{ zIndex: 98 }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="footer-link-page-haders">
                            <p>{name}</p>
                        </div>
                  
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header