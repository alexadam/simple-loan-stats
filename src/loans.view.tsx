import React, { useEffect, useState } from 'react'
import Input from './components/input'
import './loans.view.scss'

interface ILoansViewProps {

}

const LoansView = (props: ILoansViewProps) => {

  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(10.25)
  const [loanTerm, setLoanTerm] = useState(360)
  const [stdMonthlyPayment, setStdMonthlyPayment] = useState(0)
  const [stdMonthlyPaymentPercent, setStdMonthlyPaymentPercent] = useState(0)

  const [monthlyIncome, setMonthlyIncome] = useState(10000)
  const [savings, setSavings] = useState(50000)

  const [youWantToPay, setYouWantToPay] = useState(1000)
  const [payBack, setPayBack] = useState(100)

  const [payInAdvance, setPayInAdvance] = useState(10000)
  const [payInAdvancePayment, setPayInAdvancePayment] = useState(0)
  const [payInAdvancePaymentPercent, setPayInAdvancePaymentPercent] = useState(0)

  const [howManyInstallments, setHowManyInstallments] = useState(0)

  useEffect(() => {
    const i = interestRate / 100 / 12
    const loanAmountDiff = loanAmount - payInAdvance
    const newPayment2 = loanAmount * i / (1 - Math.pow((1 + i), -loanTerm))
    const newPaymentAdvance = loanAmountDiff * i / (1 - Math.pow((1 + i), -loanTerm))
    setStdMonthlyPayment(Math.ceil(newPayment2))
    setStdMonthlyPaymentPercent(Math.floor(  (Math.ceil(newPayment2)/monthlyIncome * 100)  * 100) / 100)
    setPayInAdvancePayment(Math.ceil(newPaymentAdvance))
    setPayInAdvancePaymentPercent(Math.floor(  (Math.ceil(newPaymentAdvance)/monthlyIncome * 100)  * 100) / 100)

    const tmpYouWantToPay = youWantToPay
    const tmpLoanAmount = tmpYouWantToPay * (1 - Math.pow((1 + i), -loanTerm)) / i
    const tmpPayBack = Math.ceil((loanAmount - tmpLoanAmount))

    setYouWantToPay(tmpYouWantToPay)
    setPayBack(tmpPayBack)

    setHowManyInstallments(Math.floor(savings / Math.ceil(newPayment2)))

  }, [loanAmount, interestRate, loanTerm, youWantToPay, payInAdvance, savings, monthlyIncome])


  return (
    <div className='loans-view'>
      <div className="loan-data">
        <div className="loan-data-container">
          <Input
            label='Loan Amount' value={loanAmount} onValueUpdate={setLoanAmount} />
          <Input
            label='Interest Rate' value={interestRate} onValueUpdate={setInterestRate} float={true} />
          <Input
            label='Loan Term (months)' value={loanTerm} onValueUpdate={setLoanTerm} />
          <Input
            label='Monthly Income' value={monthlyIncome} onValueUpdate={setMonthlyIncome} />
          <Input
            label='Savings' value={savings} onValueUpdate={setSavings} />

        </div>
      </div>

      <div className="loan-stats">

        <div className="loan-stats-cell">
          <div className='label-text'>Your monthly payment is <span className="computed-value">{stdMonthlyPayment}</span> or <span className="computed-value">{stdMonthlyPaymentPercent}%</span> of income</div>
        </div>

        <div className="loan-stats-cell">
          <div className='label-text '>Savings cover <span className="computed-value">{howManyInstallments}</span> monthly payments</div>
        </div>

        <div className="loan-stats-cell">
          <Input
            label='If you want a monthly payment equal to' value={youWantToPay} onValueUpdate={setYouWantToPay} inline={true} />
          <div className='label-text '>You must pay <span className="computed-value">{payBack}</span> in advance </div>
        </div>

        <div className="loan-stats-cell">
          <Input
            label='If you pay in advance' value={payInAdvance} onValueUpdate={setPayInAdvance} inline={true} />
          <div className='label-text '>Your monthly payment will be <span className="computed-value">{payInAdvancePayment}</span>  or <span className="computed-value">{payInAdvancePaymentPercent}%</span> of income</div>
        </div>

      </div>

    </div>
  )
}

export default LoansView