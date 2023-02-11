import React from 'react'

function CardEntry(props) {
  return (
    <div>
        <p className='query'>{props.query}</p>
        <p className='response' style={props.style}>{props.response}</p>
    </div>
  )
}

export default CardEntry