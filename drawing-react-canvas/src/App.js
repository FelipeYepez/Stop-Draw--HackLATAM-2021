import React, { useRef, useEffect, useState } from 'react';

let color = "black";

document.getElementById("color-pick").addEventListener("change", function(){
  color = this.value;
  console.log('This Value is', this.value);});

function App() {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth *0.7;
    canvas.height = window.innerHeight *0.7;
    canvas.style.width = `${window.innerWidth *0.7}px`;
    canvas.style.height = `${window.innerHeight *0.7}px`;

    const context = canvas.getContext("2d")
    //context.scale(1,1)
    context.lineCap = "round"
    context.strokeStyle = color
    context.lineWidth = 3
    contextRef.current = context;
  }, [])
  
  const startDrawing = ({nativeEvent}) =>{
    const {offsetX, offsetY} = nativeEvent;
    
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () =>{
    contextRef.current.closePath()
    setIsDrawing(false)  
  }

  const draw = ({nativeEvent}) =>{
    if(!isDrawing){
      return
    }
    contextRef.current.strokeStyle = color;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  return (
    <p >
      <canvas id="canvas"  class="center-block"
        onMouseDown = {startDrawing}
        onMouseUp = {finishDrawing}
        onMouseMove = {draw}
        ref = {canvasRef}
      />
    </p>  
  );
}

export default App;
