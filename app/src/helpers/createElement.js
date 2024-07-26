export default function createElement(classNames, attrs = {}) {
  const el = document.createElement("div");
  classNames.forEach((className) => el.classList.add(className));

  for (const attr in attrs) {
    el.setAttribute(attr, attrs[attr]);
  }
  return el;
}
