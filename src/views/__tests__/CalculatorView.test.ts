import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CalculatorView from "../CalculatorView.vue";

describe("CalculatorView", () => {
  it("renders as expected", () => {
    const wrapper = shallowMount(CalculatorView);
    expect(wrapper.element).toMatchSnapshot();
  });
});
