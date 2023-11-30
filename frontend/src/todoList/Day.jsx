import React from 'react';
import { useState } from 'react'
import './day.css'


// return a circular button that represents a day
// when clicked on, alternate between every click for highlighting dark and light
// If clicked, store the day has been clicked as 0 if not, and 1 if clicked.


const Day = () => {
        return (
                <div id = "days">
                    <button class = "btn">Mo</button>
                    <button class = "btn">Tu</button>
                    <button class = "btn">We</button>
                    <button class = "btn">Th</button>
                    <button class = "btn">Fr</button>
                    <button class = "btn">Sa</button>
                    <button class = "btn">Su</button>
                </div>
                
        );
};

export default Day;