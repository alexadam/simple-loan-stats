import React, {useEffect, useState} from 'react';
import './input.scss'
import NumberCells from './number-cells';

interface IInputProps {
  label: string,
  value: number,
  onValueUpdate: (newValue: number) => void
  float?: boolean
  inline?: boolean
}

const Input = (props: IInputProps) => {
  const className = props.inline ? 'input-component-row' : 'input-component'
  return (
    <div className={className}>
      <div className="input-label">
          {props.label}
        </div>
        <div className="input-row">
          {/* <input type="number" 
            value={props.value} 
            onChange={(e: any) => props.onValueUpdate(parseFloat(e.target.value))} 
            className='input' /> */}
          <NumberCells nr={props.value} onChange={(e: any) => props.onValueUpdate(e)} float={props.float} />
        </div>
    </div>
  )
}

export default Input