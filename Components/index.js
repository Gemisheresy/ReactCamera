import React,{ Component} from "react";
import ReactDOM from 'react-dom';
import Camera from "./Camera"


class App extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Camera />
            </div>
        )
    }
}
ReactDOM.render(<App/>,document.getElementById("app"))