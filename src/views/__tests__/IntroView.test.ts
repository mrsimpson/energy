import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IntroView from "../IntroView.vue";

describe("IntroView", () => {
  it("renders as expected", () => {
    const wrapper = shallowMount(IntroView);
    expect(wrapper.element).toMatchSnapshot();
  });
});
