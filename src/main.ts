import './styles/app.scss'
import App from './App.svelte'
import { mount } from "svelte";
import { loadFeedbackWidget } from "./lib/utils/runtimeConfig";

loadFeedbackWidget()

const app = mount(App, {
  target: document.getElementById('app')
})

export default app
