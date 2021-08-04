import React from 'react'
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'

const L = (props) => <NavLink className="router-link" activeClassName="active-router-link" exact { ...props } />
const R = (props) => <Route exact { ...props } />

import Intro from './intro'
import Mosaic from './mosaic'
import Impress from './impress'
import Video from './video'

import './router.css'

export default props => {
    return (
        <Router>
            <div className="top-menu">
                <L to="/">Intro</L>
                <L to="/mosaic">Mosaic</L>
                <L to="/impress">Impressionist</L>
                <L to="/video">Impression of A Lion</L>
            </div>
            <div className="content-body">
                <R path="/" component={Intro} />
                <R path="/mosaic" component={Mosaic} />
                <R path="/impress" component={Impress} />
                <R path="/video" component={Video} />
            </div>
        </Router>
    )
}