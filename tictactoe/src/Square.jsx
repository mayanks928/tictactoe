import React from "react"

export default function Square(props){
    return(
        <div 
        className={"square square"+props.item.contents}
        onClick={()=>props.toggle(props.item.index)}>
            {props.item.contents}
        </div>
    )
}