import { SlideEnums } from "../../enums";

const reducer = (currIndex, action, totalSlides) => {
  switch (action) {
    default:
      return currIndex;
    case SlideEnums.NEXT:
      return (currIndex + 1) % totalSlides;
    case SlideEnums.BACK:
      return (currIndex - 1) % totalSlides;
  }
};

export default reducer;
