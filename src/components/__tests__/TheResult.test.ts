import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TheResult from '../TheResult.vue';

describe("TheResult", () => {
    it("should render as expected", () => {
        const wrapper = shallowMount(TheResult, {
            propsData: {
                years: [2021, 2022, 2023],
                bills: [1000, 1500, 2000],
                savings:[0, 0, 400],
                reductions: [0, 80, 300],
            }
        })
        expect(wrapper.element).toMatchSnapshot()
    })
})