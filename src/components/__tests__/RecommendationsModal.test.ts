import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import RecommendationsModal from "@/components/RecommendationsModal.vue";
import { ref } from "vue";

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
    });
    expect(
      document.querySelector(".n-modal-container .n-modal-body-wrapper")
    ).toMatchSnapshot();
  });
});
