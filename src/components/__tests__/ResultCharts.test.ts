import { shallowMount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vitest } from 'vitest';
import ResultCharts from '../ResultCharts.vue';

describe("ResultCharts", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vitest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vitest.fn(), // Deprecated
        removeListener: vitest.fn(), // Deprecated
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      }))
    });
  });
  it("should render as expected", () => {
    const wrapper = shallowMount(ResultCharts, {
      propsData: {
        years: ['2021', '2022', '2023 ohne Einsparung', '2023'],
        bills: [1000, 2000, 3000, 2500],
        subsidization: [0, 200, 500, 500],
        savings: [0, 0, 0, 500]
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
