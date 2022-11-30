import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TestHelper from "@/lib/TestHelper";
import component from "../CalculatorView.vue";

describe("CalculatorView", () => {
  it("renders as expected", () => {
    const testHelper = TestHelper();
    testHelper.setupStore();
    const wrapper = shallowMount(component, testHelper.mountOptions());
    expect(wrapper.element).toMatchSnapshot();
  });
});
