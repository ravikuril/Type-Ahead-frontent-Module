import React, { Component } from 'react';
import './AutoCompleteText.css';

export default class AutoCompleteText extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
            suggestions: []
        }
    }

    onTextChange = (e) => {
        var value = e.target.value;
        let suggestions = [];
        if(value.indexOf(' ') >= 0){
            let word = value.trim();
            this.incrementFrequency(word);
        }
        if(value.length > 0)
        {
            // const regex = new RegExp(`^${value}`,'i');
            // console.log(regex)
            // suggestions = this.items.sort().filter(v => regex.test(v));
            // console.log(suggestions)
           
            this.getSuggestions(value);
        }
        this.setState(() => ({
            text : value,
            suggestions : suggestions
        }));
    }

    incrementFrequency = (value) => {
        var url = "http://localhost:8080/" + value;
        
        fetch(url, { method: "POST",
        headers: {
            "cross-origin" : true,
            "access-control-allow-origin" : "*",
        }})
        .then(res => res)
        this.setState({
            suggestions: []
        });
    }

    getSuggestions = (value) =>{
        var n = value.split(" ");
        value = n[n.length - 1];
        if(value.length === 0){
            return;
        }
        var url = "http://localhost:8080/" + value;
       
        fetch(url, { method: "GET",
        headers: {
            "cross-origin" : true,
            "access-control-allow-origin" : "*",
        }})
        .then(res => res.json())
        .then(
            (result) => {
                let resultArray = result.slice(0, 10);
                this.setState({
                    suggestions: resultArray
                });
            },
            (error) => {
                console.log(error)
            }
        )
    }

    suggestionSelected = (value) => {
        var curr = this.state.text;
        var lastIndex = curr.lastIndexOf(" ");
        let prev = curr.substring(0, lastIndex);
        prev = prev +" "+value;
        this.setState(() => ({
            text : prev,
            suggestions : []
        }));
    }

    renderSuggestions = () => {
        const {suggestions} = this.state;
        if(!suggestions || suggestions.length === 0){
            return(
                <ul></ul>
            )
        }
        return (
                <ul>
                    { suggestions.map((item) => 
                            <li onClick = {() => this.suggestionSelected(item)} key={item}>
                                {item}
                            </li>
                    )}
                </ul>
        );
    }


    render() {
        const {text} = this.state;
        return (
            <div className="AutoCompleteText">
                <input type="text" value={text} onChange={this.onTextChange} />
                {this.renderSuggestions()}
            </div>
        );
      }
}