import { navigationEnums } from "../../enums";

const reducer = (currIndex, action) => {
  const { type, totalSlides } = action;
  switch (type) {
    case navigationEnums.NEXT:
      return (currIndex + 1) % totalSlides;
    case navigationEnums.BACK:
      return (currIndex - 1 + totalSlides) % totalSlides;
    default:
      return currIndex;
  }
};

export default reducer;
