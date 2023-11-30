import React from 'react';
import './priorities.css'


// return a circular button that represents a day
// when clicked on, alternate between every click for highlighting dark and light
// If clicked, store the day has been clicked as 0 if not, and 1 if clicked.


const Priority = () => {
        return (
                <div id = "priorities">
                    <button class = "p0">None</button>
                    <button class = "p1">Low</button>
                    <button class = "p2">Med</button>
                    <button class = "p3">High</button>
                </div>
                
        );
};

export default Priority;