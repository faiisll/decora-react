import { useNavigate } from "react-router";


const NavigationWrapper = () => {
  const navigate = useNavigate();

  // Expose navigate function to global window object
  window.navigate = navigate;

  return null; // This component doesn't need to render anything
};

export default NavigationWrapper;