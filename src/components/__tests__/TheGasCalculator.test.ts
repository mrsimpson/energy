import { describe, it, expect, vi } from "vitest";

import { shallowMount } from "@vue/test-utils";
import TheGasCalculator from "../TheGasCalculator.vue";

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });

describe("TheGasCalculator", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(TheGasCalculator);
    expect(wrapper.element).toMatchSnapshot();
  });
});
