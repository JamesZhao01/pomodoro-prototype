class Poge extends HTMLElement {
    constructor() {
        super();
        let template = document.querySelector("#poge");
        this.append(template.content.cloneNode(true));
    }
}

class Poggers extends HTMLElement {
    constructor() {
        super();
        let template = document.querySelector("#poggers");
        this.append(template.content.cloneNode(true));
    }
}
window.customElements.define("poge-poge", Poge);
window.customElements.define("poggers-poggers", Poggers);