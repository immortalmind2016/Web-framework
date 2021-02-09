//Build userform
export class UserForm {
  constructor(public parent: Element) {
    this.parent = parent;
  }

  onButtonClick(): void {
    console.log("HI THERE");
  }
  onButtonHover(): void {
    console.log("HI HOVER");
  }
  template(): string {
    return `
    <div>
        <h1>User form</h1>
        <input />
        <div type="submit" click={this.onButtonClick} onmouseover={this.onButtonHover}>click me</div>
        
    </div>
       `;
  }
  eventListener(attr, attrs) {
    let fun = attrs[attr];
    let { nodeName: event, nodeValue: value, nodeType } = fun;

    let fn = value && value.replace("}", "").replace("{", "").replace("this.", "");
    let classMethods = Object.keys(Object.getPrototypeOf(this));
    let index = classMethods.indexOf(fn);
    let fnRef = Object.getPrototypeOf(this)[classMethods[index]];
    return [event, fnRef];
  }
  bindEvents(fragment: DocumentFragment): void {
    for (let element of fragment.children[0].children) {
      let attrs = element.attributes;
      for (let attr in attrs) {
        let [event, fnRef] = this.eventListener(attr, attrs);

        if (event && fnRef) element.addEventListener(event, fnRef);
      }
    }
  }
  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
