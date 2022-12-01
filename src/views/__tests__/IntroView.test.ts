import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TestHelper from "@/lib/TestHelper";
import component from "../IntroView.vue";

describe("IntroView", () => {
  it("renders as expected", async () => {
    const testHelper = TestHelper()
    await testHelper.setupRouter([{ name: "root", path: "/", component }])
    const wrapper = shallowMount(component, testHelper.mountOptions());
    expect(wrapper.element).toMatchSnapshot();
  });
});
