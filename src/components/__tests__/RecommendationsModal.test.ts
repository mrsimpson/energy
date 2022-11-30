import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RecommendationsModal from "@/components/RecommendationsModal.vue";
import { ref } from "vue";
import { createTestingPinia } from "@pinia/testing";

describe("RecommendationsModal", () => {
  beforeEach(() => {
    const el = document.createElement("div");
    el.id = "n-modal-container";
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.outerHTML = "";
  });

  it("should render as expected", () => {
    const value = ref(0);
    mount(RecommendationsModal, {
      props: { show: true, value: value.value },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });
    expect(
      document.querySelector(".n-modal-container .n-modal-body-wrapper")
    ).toMatchSnapshot();
  });
});
