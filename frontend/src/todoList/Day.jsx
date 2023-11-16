import React from 'react';
import { useState } from 'react'
import styles from "./day.css"


// return a circular button that represents a day
// when clicked on, alternate between every click for highlighting dark and light
// If clicked, store the day has been clicked as 0 if not, and 1 if clicked.


class Day extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            addend: 0 // either 1, 0, or -1
        }
    }

    toggleClick= () => {
        this.setState(prevState => ({
            addend: prevState.addend === 1 ? 0 : 1
        }))
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleClick}>
                    <p>props.dow</p>
                </button>
                <span>{this.state.count + this.state.addend}</span>
            </div>
        );
    }
}

export default Day;