import { describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TestHelper from "@/lib/TestHelper";
import component from "../TheGasCalculator.vue";

describe("TheGasCalculator", () => {
  it("renders properly", () => {
    const testHelper = TestHelper();
    testHelper.setupStore();
    const wrapper = shallowMount(component, testHelper.mountOptions());
    expect(wrapper.element).toMatchSnapshot();
  });
});
