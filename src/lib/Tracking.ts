import { debounce } from 'debounce'
const trackerQueue: string[][] = (window as any)?._paq || []
const DELAY = 300;

function trackEvent(category: string, action: string, name?: string, value?: string | number) {
    console.info(new Date(), 'event', category, action, name, value)
    trackerQueue.push(["trackEvent", category, action, name || "", value?.toString() || ""])
}

export const trackInput = (inputId: string, value?: string | number)
    : boolean => {
    trackEvent("form", "input", inputId, value?.toString())
    return true // in order to allow using it in && expressions
}

/**
 * Generates a function tracking input which is executed after a delay
 * @param fn the actual function that shall be executed
 * @param inputId an identifier of the input
 * @param trackValue whether the input's value shall be included in the event
 * @param delay How long this input shall be debounced
 * @returns a debounced, tracking function
 */
export function createInputHandler(
    fn: Function,
    inputId: string,
    trackValue = false,
    delay = DELAY) {
    return debounce(
        (args: any) => {
            trackInput(inputId, trackValue ? args.toString() : undefined);
            fn.call({}, args)
        },
        delay,
        false
    )
}