import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TheResult from '../TheResult.vue';

describe("TheResult", () => {
    it("should render as expected", () => {
        const wrapper = shallowMount(TheResult, {
            propsData: {
                years: ['2021', '2022', '2023 ohne Einsparung', '2023'],
                bills: [1000, 2000, 3000, 2500],
                subsidization: [0, 200, 500, 500],
                savings: [0, 0, 0, 500],
                reduction2023: 500
            }
        })
        expect(wrapper.element).toMatchSnapshot()
    })
})