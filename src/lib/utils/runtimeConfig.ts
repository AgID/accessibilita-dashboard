// Runtime configuration loaded by public/config.js before the application.
// It replaces the build-time VITE_* variables, so the same build can be deployed to every environment.

export interface AppConfig {
  feedbackHost?: string;
  feedbackApiMode?: string;
}

export const appConfig: AppConfig = window.APP_CONFIG ?? {};

// Loads the feedback widget (custom element <feedback-widget>) from the configured host.
export function loadFeedbackWidget(): void {
  if (!appConfig.feedbackHost) {
    return;
  }
  const script = document.createElement("script");
  script.type = "module";
  script.src = appConfig.feedbackHost;
  document.head.appendChild(script);
}
