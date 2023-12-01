import React from 'react';
import { useState } from 'react'
import './day.css'


// return a circular button that represents a day
// when clicked on, alternate between every click for highlighting dark and light
// If clicked, store the day has been clicked as 0 if not, and 1 if clicked.


const Day = () => {
        const [buttonStates, setButtonStates] = useState( {
                Mo: false,
                Tu: false,
                We: false,
                Th: false,
                Fr: false,
                Sa: false,
                Su: false,

        });

        const handleButtonClick = (day) => {
                setButtonStates((prevButtonStates) => ({
                        ...prevButtonStates,
                        [day]: !prevButtonStates[day],
                }));
        }
        return (
                <div id = "days">
                    <button className ={buttonStates.Mo ? 'btn-clicked': 'btn'} onClick ={() => handleButtonClick('Mo')}>Mo</button>
                    <button className ={buttonStates.Tu ? 'btn2-clicked': 'btn2'} onClick ={() => handleButtonClick('Tu')}>Tu</button>
                    <button className ={buttonStates.We ? 'btn-clicked': 'btn'} onClick ={() => handleButtonClick('We')}>We</button>
                    <button className ={buttonStates.Th ? 'btn2-clicked': 'btn2'} onClick ={() => handleButtonClick('Th')}>Th</button>
                    <button className ={buttonStates.Fr ? 'btn2-clicked': 'btn2'} onClick ={() => handleButtonClick('Fr')}>Fr</button>
                    <button className ={buttonStates.Sa ? 'btn2-clicked': 'btn2'} onClick ={() => handleButtonClick('Sa')}>Sa</button>
                    <button className ={buttonStates.Su ? 'btn2-clicked': 'btn2'} onClick ={() => handleButtonClick('Su')}>Su</button>
                </div>
                
        );
};

export default Day;