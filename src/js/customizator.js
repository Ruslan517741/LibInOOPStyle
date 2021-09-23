export default class Customizaror {
    constructor() {
        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');

        this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
        this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    }


    onScaleChange(e) {
        let scale;
        const body = document.querySelector('body');
        if (e.target.value) {
            scale = +e.target.value.replace(/x/g, '');
        }
        console.log(scale);

        function recursy(element) {
            element.childNodes.forEach(node => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''));
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + "px";
                    } else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + "px";
                    }

                } else {
                    recursy(node);
                }
            });
        }
        recursy(body);
    }

    onColorChange(e) {
        const body = document.querySelector('body');
        body.style.backgroundColor = e.target.value;

        console.log(e.target.value);
    }

    render() {
        let scaleInputsS = document.createElement('input'),
            scaleInputsM = document.createElement('input'),
            panel = document.createElement('div');

        panel.append(this.btnBlock, this.colorPicker);

        scaleInputsS.classList.add('scale_btn');
        scaleInputsM.classList.add('scale_btn');
        this.btnBlock.classList.add('scale');
        this.colorPicker.classList.add('color');

        scaleInputsS.setAttribute('type', 'button');
        scaleInputsM.setAttribute('type', 'button');
        scaleInputsS.setAttribute('value', '1x');
        scaleInputsM.setAttribute('value', '1.5x');
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');

        this.btnBlock.append(scaleInputsS, scaleInputsM);

        panel.classList.add('panel');

        document.querySelector('body').append(panel);

    }
}