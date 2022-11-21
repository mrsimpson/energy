import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { NModal } from "naive-ui";
import type { Component } from 'vue';

type Modal = { componentVM: { containerRef: HTMLElement } }

export default function TestHelper() {
  let modalContainerCreated = false

  return {
    async setupRouter(routes: Array<RouteRecordRaw>) {
      const router = createRouter({
        history: createWebHistory(),
        routes,
      })
      router.push('/')
      await router.isReady()
      return router
    },
        
    setupModal() {
      const el = document.createElement("div");
      el.id = "n-modal-container";
      document.body.appendChild(el);
      modalContainerCreated = true
    },

    teardown() {
      if (modalContainerCreated) {
        document.body.outerHTML = "";
      }
    },

    getModalElement(wrapper: { getComponent(component: Component): unknown }) {
      if (!modalContainerCreated) {
        return null
      }
      const modal = wrapper.getComponent(NModal) as Modal
      return modal.componentVM.containerRef.firstChild;
    }
  }
}
