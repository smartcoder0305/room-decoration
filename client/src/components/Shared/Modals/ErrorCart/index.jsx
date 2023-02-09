
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import './style.css'

const ErrorCart = ({style}) => {
  const { height, width } = useWindowDimensions();
  if (width < 767) {
    return (
      <div className="cart-error-message-mobile" style={{ ...style }}>
        <img src="/assets/file/images/ErrorCartMessage.png" alt=""/>
      </div>
    );
  }
  return (    
    <div className="cart-error-message" style={{ ...style }}>
      <img src="/assets/file/images/ErrorCartMessage.png" alt=""/>
    </div>
  )
}

export default ErrorCart