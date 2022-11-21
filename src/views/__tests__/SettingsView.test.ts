import { shallowMount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import SettingsView from "../SettingsView.vue";

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}))

describe("SettingsView", () => {
  it("renders as expected", () => {
    const wrapper = shallowMount(SettingsView);
    expect(wrapper.element).toMatchSnapshot();
  });
});
