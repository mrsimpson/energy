
const trackerQueue: string[] = (window as any)?._paq || []

function trackEvent(category: string, action: string, name?: string, value?: string | number) {
    trackerQueue.push(category, action, name || "", value?.toString() || "")
    return true // in order to allow using it in && expressions
}

export const trackInput = (inputId: string, value?: string | number) => {
    trackEvent("form", "input", inputId, value?.toString())
}

