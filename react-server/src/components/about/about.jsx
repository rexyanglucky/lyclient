import React, { Component } from 'react';
import AboutContent  from '../common/aboutContent';
import '@/css/about.css';
class About extends Component {
    render() {
        return (
            <div className='about_content'>
                <AboutContent/>
            </div>
        )
    }
}
export default About;