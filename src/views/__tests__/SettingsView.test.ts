import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TestHelper from "@/lib/TestHelper";
import component from "../SettingsView.vue";

describe("SettingsView", () => {
  it("renders as expected", () => {
    const testHelper = TestHelper();
    testHelper.setupRouter([{ name: "root", path: "/", component }]);
    testHelper.setupStore();
    const wrapper = shallowMount(component, testHelper.mountOptions());
    expect(wrapper.element).toMatchSnapshot();
  });
});
