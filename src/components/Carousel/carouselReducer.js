import { navigationEnums } from "../../enums";

export const setState = (currIndex, animate) => ({
  currIndex,
  animate
});

export const reducer = (carouselState, action) => {
  const { currIndex } = carouselState;
  const { type, totalSlides } = action;

  switch (type) {
    case navigationEnums.NEXT: {
      const newIndex = (currIndex + 1) % totalSlides;
      return setState(newIndex, true);
    }
    case navigationEnums.BACK: {
      const newIndex = (currIndex - 1 + totalSlides) % totalSlides;
      return setState(newIndex, true);
    }
    default:
      return setState(currIndex, false);
  }
};
