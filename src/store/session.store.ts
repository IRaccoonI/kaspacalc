import { makeAutoObservable, observable } from "mobx";
import { DefaultInputValues, KaspaInputs } from "../constants/Kaspa";

class SessionStore {
  @observable
  defaultInputValues: DefaultInputValues | null = null;

  constructor() {
    makeAutoObservable(this);
    const sessionData = window.localStorage.getItem("defaultInputValues");
    if (sessionData !== null) this.defaultInputValues = JSON.parse(sessionData);
  }

  setDefaultInputValues = (
    key: keyof KaspaInputs,
    value: number | undefined
  ): void => {
    if (!this.defaultInputValues) this.defaultInputValues = {};
    const result = {
      ...this.defaultInputValues,
      [key]: value,
    };
    this.defaultInputValues = result;
    window.localStorage.setItem("defaultInputValues", JSON.stringify(result));
  };
}

export default SessionStore;
