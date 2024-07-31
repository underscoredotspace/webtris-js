export default function createElement(
  classNames: string[],
  attributes: Record<string, string> = {},
): HTMLDivElement {
  const element = document.createElement("div");
  element.classList.add(...classNames);

  Object.keys(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}
