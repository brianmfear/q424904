import { LightningElement } from "lwc";
import { subscribe, unsubscribe, publish } from "c/pubsub";

export default class Validator extends LightningElement {
  handshakeCallback = (payload) => {
    if (payload.component === "form") {
      this.isFormAvailable = payload.state;
      this.hasFormValidated = false;
    }
  };
  validationCallback = (payload) => {
    if (payload.component === "form") {
      this.hasFormValidated = payload.validated;
    }
  };
  hasFormValidated = false;
  isFormAvailable = false;
  connectedCallback() {
    subscribe("handshake", this.handshakeCallback);
    subscribe("validations", this.validationCallback);
    // Request a message from the form
    publish("handshake", { component: "validator" });
  }
  disconnectedCallback() {
    unsubscribe("handshake", this.handshakeCallback);
    unsubscribe("validations", this.validationCallback);
  }
  async handleValidateClick() {
    publish("validations", { component: "validator" });
    await Promise.resolve();
    if (!this.isFormAvailable || this.hasFormValidated) {
      // safe to continue saving
    }
  }
}
