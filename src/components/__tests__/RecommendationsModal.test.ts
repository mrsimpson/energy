import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import component from "@/components/RecommendationsModal.vue";
import { ref } from "vue";
import type { Router } from 'vue-router';
import TestHelper from '@/lib/TestHelper';
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

const testHelper = TestHelper()
let router: Router

function getMountOptions(value = ref(0)) {
  const store = createTestingPinia({ createSpy: vi.fn })
  const recommendations = ["first recommendations", "second recommendation"]
  return {
    props: { show: true, value: value.value, recommendations },
    global: { plugins: [store, router] }
  }
}

describe("RecommendationsModal", () => {
  beforeEach(async () => {
    testHelper.setupModal()
    router = await testHelper.setupRouter([
      { name: "root", path: "/", component },
      { name: "settings", path: "/settings", component },
    ])
  });

  afterEach(testHelper.teardown);

  it("should render as expected", () => {
    const modal = testHelper.getModalElement(mount(component, getMountOptions()))
    expect(modal).toMatchSnapshot();
  });
});
