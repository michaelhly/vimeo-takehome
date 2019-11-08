export const windowResizeListener = (browerWindow, handler) => {
  browerWindow.addEventListener("resize", handler);
  return () => {
    browerWindow.removeEventListener("resize", handler);
  };
};

export const truncateText = (text, textLimit) => {
  return text.length > textLimit ? `${text.substring(0, textLimit)}...` : text;
};
