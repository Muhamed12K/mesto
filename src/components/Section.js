export class Section {
    constructor(object, selector) {
        this._items    = object.items;
        this._renderer = object.renderer;

        this._node = document.querySelector(selector);
    };

    render() {
        this._items.forEach((item) => {
            this._node.append(this._renderer(item));
        })
    };

    addItem(node) {
        this._node.prepend(node)
    }
}