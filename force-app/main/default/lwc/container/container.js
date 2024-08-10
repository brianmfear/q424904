import { LightningElement } from 'lwc';

export default class Container extends LightningElement {
    toggleForm() {
        this.formRendered = !this.formRendered;
    }
    formRendered = false;
}