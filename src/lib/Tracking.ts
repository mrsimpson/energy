const trackerQueue: string[] = (window as any)?._paq || []

function trackEvent(category: string, action: string, name?: string, value?: string | number) {
    trackerQueue.push(category, action, name || "", value?.toString() || "")
}

export const trackInput = (inputId: string, value?: string | number, debounceDelay = 2000)
    : boolean => {
    trackEvent("form", "input", inputId, value?.toString())
    return true // in order to allow using it in && expressions
}

