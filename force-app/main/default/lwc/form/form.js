import { LightningElement } from "lwc";
import { subscribe, unsubscribe, publish } from "c/pubsub";
export default class Form extends LightningElement {
  handshakeHandler = (payload) => {
    if (payload.component === "validator") {
      publish("handshake", { component: "form", state: true });
    }
  };
  validationHandler = (payload) => {
    if (payload.component === "validator") {
      publish("validations", { component: "form", validated: this.refs.firstName.checkValidity() });
    }
  };
  connectedCallback() {
    subscribe("handshake", this.handshakeHandler);
    subscribe("validations", this.validationHandler);
    publish("handshake", { component: "form", state: true });
  }
  disconnectedCallback() {
    unsubscribe("handshake", this.handshakeHandler);
    unsubscribe("validations", this.validationHandler);
    publish("handshake", { component: "form", state: false });
  }
}
