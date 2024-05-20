const CheckoutSteps = ({ current = 0 }) => {
  return (
    //steps from daisy UI to show the overall process, progress and current step
    <ul className="steps steps-vertical lg:steps-horizontal w-full mt-4">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <li
            key={step}
            //if current state is greater/equal to index, color as done, otherwise show as normal or uncomplete
            className={`step ${index <= current ? 'step-primary' : ''}`}
          >
            {step}
          </li>
        )
      )}
    </ul>
  )
}

export default CheckoutSteps
