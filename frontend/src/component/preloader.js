import React from 'react'
import logo from '../services/logo/NT.gif'

function preloader() {
    return (
        <div class="preloader">
            <img src={logo} alt="loading..." />
        </div>
    )
}
export default preloader