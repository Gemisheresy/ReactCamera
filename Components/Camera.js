import React,{Component,}from 'react';

export default class Camera extends Component {
    constructor(props){
        super(props)
      
        this.toggleStream = this.toggleStream.bind(this)
        this.changeSize = this.changeSize.bind(this)
        this.takepicture = this.takepicture.bind(this)
        this.clearphoto =this.clearphoto.bind(this);
        this.state ={
            height : 640,
            width: 480,
            stream: "Stop",
            video : {}
        }
    }
    componentWillMount(){
        let self = this;
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
                self.setState({
                    video: video
                })
            });
            
        }
        
    }
    clearphoto() {
        let canvas = this.refs.canvas;
        let photo = this.refs.photo
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      }
    changeSize(){
        let sizes = {
                small : [320,200],
                med: [640,480],
                large: [1024,768]
            };
        let newSize = sizes[this.refs.size.value];
        let newHeight = newSize[0];
        let newWidth = newSize[1]
        this.setState({
            height: newHeight,
            width: newWidth,
         })
           

        }
    toggleStream(){
        let prev = this.state.stream;
        if(this.state.stream === "Stop"){
            this.state.video.pause();
            this.setState({
                stream:"Start"
            })
        }
        else{
            this.state.video.play()
            this.setState({
                stream:"Stop"
            })
        }
    }
    takepicture() {
        let canvas = this.refs.canvas;
        let photo =this.refs.photo;
    
        var context = canvas.getContext('2d');
        if (this.state.width && this.state.height) {
          canvas.width = this.state.width;
          canvas.height = this.state.height;
          context.drawImage(video, 0, 0, this.state.width, this.state.height);
        
          var data = canvas.toDataURL('image/png');
          photo.setAttribute('src', data);

        } else {
          this.clearphoto();
        }
      }
    render(){
        return (
            <div id="camera">
                <video id="video" ref="video" width={this.state.width} height={this.state.height}></video>
                <div>
                <button onClick={()=>this.toggleStream()}>{this.state.stream}</button>
                <button id="snap" onClick={()=>this.takepicture()}>Snap Photo</button>
                <select ref="size"defaultValue="med" onChange={this.changeSize}>
                    <option value="small">320 x 200</option>
                    <option value="med" >640 x 480</option>
                    <option value="large">1024 x 768</option>                                       
                </select>
                </div>
                <div>
                    <canvas ref="canvas" height={this.state.height} width={this.state.width}></canvas>
                    <div className="output">
                        <img id="photo" ref="photo" alt="The screen capture will appear in this box."/>
                    </div>
                </div>
            </div>
        )
    }
}