import TestHelper from "@/lib/TestHelper";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import component from "../IntroView.vue";

const testHelper = TestHelper()

describe("IntroView", () => {
  it("renders as expected", async () => {
    const router = await testHelper.setupRouter([
      { name: "root", path: "/", component },
    ])

    const wrapper = shallowMount(component, {global: { plugins: [router] }});
    expect(wrapper.element).toMatchSnapshot();
  });
});
