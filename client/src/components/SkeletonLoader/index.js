import React from 'react'
import './style.css'

function index() {
    return (
        <>
            {/* <h1>hello</h1>
            <div>
                <span class="skeleton-loader"></span>
            </div> */}

            <section className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-1 order-md-2">
                            <div className="ban-img">
                                <span className="skeleton-loader first-sk-loader"></span>
                            </div>
                            <div className="sub order-md-3 order-2 col-12">
                                <span className="skeleton-loader second-sk-loader"></span>
                                <span className="skeleton-loader third-sk-loader"></span>
                                <span className="skeleton-loader fourth-sk-loader"></span>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="offer">
                <div>
                    <div className="res-offer">
                    <span className="skeleton-loader first-sk-loader"></span>
                    </div>
                    {/* <div className="sub order-md-3 order-2 col-12">
                        <img src="/assets/images/van.svg" alt="" className="xp" />
                        <p className="home-van-bottom-text">משלוחים חינם לכל הארץ</p>
                    </div> */}
                </div>

            </section>
        </>
    )
}

export default index