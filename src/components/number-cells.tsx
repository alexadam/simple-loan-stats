import React, { useEffect, useRef, useState } from 'react';
import './number-cells.scss'

interface INrCellProps {
  nr: number,
  index: number,
  onUpdate: (nr: number, index: number) => void
}
const NrElem = (props: INrCellProps) => {
  const [nr, setNr] = useState(props.nr)
  useEffect(() => {
    props.onUpdate(nr, props.index)
  }, [nr])

  return (
    <div className='nr-cell'>
      <button className='nr-cell-button' onClick={() => setNr((n) => (n + 1) % 10)}>
        <svg className='nr-cell-button-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
      <div className='nr-cell-label'>{nr}</div>
      <button className='nr-cell-button' onClick={() => setNr((n) => n === 0 ? 9 : Math.abs((n - 1) % 10))}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>

    </div>
  )
}


interface INrEditProps {
  nr: number
  visible: boolean
  onUpdate: (newNr: number) => void
  onDiscard: () => void
}

const NrEdit = (props: INrEditProps) => {
  const [nr, setNr] = useState(props.nr)

  const onNewEditNumber = (e: any) => {
    setNr(parseFloat(e.target.value))
  }

  if (!props.visible) {
    return null
  }

  return (
    <>
      <input type="number" className='number-cells-input' value={nr} onChange={onNewEditNumber} />
      <button className='number-cells-menu-button' onClick={props.onDiscard}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <button className='number-cells-menu-button' onClick={() => props.onUpdate(nr)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </button>
    </>
  )
}



const getDigits = (bigNr: number) => {
  const nrAsString = bigNr.toString()
  const parts = nrAsString.split('.')
  const integerStr = parts[0]
  const decimalStr = parts.length === 1 ? '00' : parts[1]

  const intDigits = integerStr.split('');
  const decDigits = decimalStr.split('');

  return {
    integer: intDigits.map(Number),
    decimal: decDigits.map(Number),
  }
}

const convertArrayToNumber = (arr: number[]) => {
  let result = ""
  for (let el of arr) {
    result += el
  }
  return Number(result)
}

interface INumberCellsProps {
  nr: number
  onChange: (newNumber: number) => void
  float?: boolean
}


const NumberCells = (props: INumberCellsProps) => {
  const allDigits = getDigits(props.nr)
  const [nrState, setNrState] = useState({
    nr: props.nr,
    intDigits: allDigits.integer,
    decDigits: allDigits.decimal
  })
  const [isEditMode, setIsEditMode] = useState(false)

  const onIntNrUpdate = (newNr: number, index: number) => {
    const newDigits = [...nrState.intDigits]
    newDigits[index] = newNr
    const intValue = convertArrayToNumber(newDigits)
    const decValue = convertArrayToNumber(nrState.decDigits)
    const newNumber = props.float ? parseFloat(newDigits.join('') + '.' + nrState.decDigits.join('')) : intValue
    const newState = {
      nr: newNumber,
      intDigits: newDigits,
      decDigits: nrState.decDigits
    }
    setNrState(newState)
    props.onChange(newNumber)
  }

  const onDecNrUpdate = (newNr: number, index: number) => {
    const newDigits = [...nrState.decDigits]
    newDigits[index] = newNr
    const intValue = convertArrayToNumber(nrState.intDigits)
    const newNumber = props.float ? parseFloat(nrState.intDigits.join('') + '.' + newDigits.join('')) : intValue
    const newState = {
      nr: newNumber,
      intDigits: nrState.intDigits,
      decDigits: newDigits
    }
    setNrState(newState)
    props.onChange(newNumber)
  }

  const startEditMode = () => {
    setIsEditMode(true)
  }

  const onSaveEdit = (newNumber: number) => {
    const allDigits = getDigits(newNumber)
    const newState = {
      nr: newNumber,
      intDigits: allDigits.integer,
      decDigits: allDigits.decimal
    }
    setNrState(newState)
    setIsEditMode(false)
  }

  const onDiscardEdit = () => {
    setIsEditMode(false)
  }

  const decimals = !props.float ? null :
    <>
      <div className='number-cell-dot'>.</div>
      {
        nrState.decDigits.map((d: number, index: number) => <NrElem key={index} nr={d} index={index} onUpdate={onDecNrUpdate} />)
      }
    </>

  const content = isEditMode ?
    <NrEdit nr={nrState.nr} onDiscard={onDiscardEdit} onUpdate={onSaveEdit} visible={isEditMode} />
    :
    <>
      {
        nrState.intDigits.map((d: number, index: number) => <NrElem key={index} nr={d} index={index} onUpdate={onIntNrUpdate} />)
      }
      {decimals}
      <button className='number-cells-menu-button' onClick={startEditMode}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
      </button>
    </>

  return (
    <div className='number-cells'>
      {content}
    </div>
  )
}

export default NumberCells