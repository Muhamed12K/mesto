export class Section {
    constructor(renderer, selector) {
        this._renderer = renderer;
        this._node     = document.querySelector(selector);
    };

    render(items, userId) {
        items.forEach((item) => {
            this._node.append(this._renderer(item, userId));
        })
    };

    addItem(node) {
        this._node.prepend(node)
    }
}