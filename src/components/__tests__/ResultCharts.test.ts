import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ResultCharts from '../ResultCharts.vue';

describe("ResultCharts", () => {
  it("should render as expected", () => {
    const wrapper = shallowMount(ResultCharts, {
      propsData: {
        years: [2021, 2022, 2023],
        bills: [1000, 2000, 3000],
        reductions: [0, 200, 500],
        savings: [0, 0, 0.1]
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
