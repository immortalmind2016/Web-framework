//Build userform
export class UserForm {
  constructor(public parent: Element) {
    this.parent = parent;
  }
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
      "hover:h1": () => console.log("HOVER"),
    };
  }
  onButtonClick(): void {
    console.log("HI THERE");
  }
  template(): string {
    return `
    <div>
        <h1>User form</h1>
        <input />
        <button type="submit">click me</button>
        
    </div>
       `;
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }
  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
