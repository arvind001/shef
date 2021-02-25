import { useState, useEffect, useRef } from "react";

//A custom hook that keeps track of whether a click occured inside the component using this hook or if the click is outside.
//this hook is needed for the pop up of suggestions that show up when the input is clicked. When clikcing away from the input
//there needs to be some signal that the pop up should go away and thats exactly what this hook does. It can be reused anywhere
//making it quite modular.
export default function useComponentVisibility(initialIsVisible) {
  //this initial visibility of the component using this hook
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );

  //create a ref so that we can access this element imperatively
  const ref = useRef(null);

  //function that triggers if event takes places outside of referenced component.
  const handleClickOutside = (event) => {
    //check if click occurs outside referenced component
    if (ref.current && !ref.current.contains(event.target)) {
      //if clicked outside set the visibility of referenced component to false
      setIsComponentVisible(false);
    }
  };

  //this effect tracks the click events that get triggered and lets it know to call the handleClickOUtside function
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  //expose the ref and the visibility state for other components to use
  return { ref, isComponentVisible, setIsComponentVisible };
}
