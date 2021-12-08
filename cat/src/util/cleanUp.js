export const cleanUp = (target) => {
  const el = document.querySelector(target);

  if (el) el.remove();
};
