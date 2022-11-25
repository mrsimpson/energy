<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { getMatomo } from "@/lib/Matomo";

const message = useMessage();
const STORAGE_KEY = "email-submitted";
const REGEXP_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const storedEmail = ref(localStorage.getItem(STORAGE_KEY));

const formRef = ref<FormInst | null>(null);
const model = ref({
  email: "",
});

const rules: FormRules = {
  email: {
    type: "email",
    required: true,
    validator: function (rule: FormItemRule, value: any) {
      return REGEXP_EMAIL.test(value)
        ? undefined
        : new Error("Bitte gib eine gültige E-Mail-Adresse ein");
    },
  },
};

const emailValidationStatus = computed(() => {
  if (!model.value.email) {
    return undefined;
  }
  return REGEXP_EMAIL.test(model.value.email) ? undefined : "error";
});

const handleSubmitClicked = async () => {
  formRef.value?.restoreValidation();
  try {
    await formRef.value?.validate();

    const Matomo = await getMatomo();
    Matomo.trackEvent("explicit", "email", model.value.email);
    localStorage.setItem(STORAGE_KEY, model.value.email);
    storedEmail.value = model.value.email;
    message.success("👍 Danke für Deine E-Mail-Adresse!");
  } catch (validationErrors) {
    (validationErrors as Array<Array<Error>>).forEach((a) =>
      a.forEach((e) => message.error(e.message))
    );
  }
};
</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules" v-if="!storedEmail">
    <p>
      Wir wollen unseren Rechner immer mal wieder erweitern. Wenn Du auf dem
      Laufenden bleiben willst, kannst Du uns hier vollkommen freiwillig Deine
      E-Mail-Adresse hinterlassen.
    </p>
    <n-space horizontal>
      <n-form-item :validation-status="emailValidationStatus" path="email">
        <n-input
          type="text"
          v-model:value="model.email"
          placeholder="Deine E-Mail-Adresse"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          type="primary"
          :disabled="!model.email"
          @click="handleSubmitClicked"
        >
          Übermitteln
        </n-button>
      </n-form-item>
    </n-space>

    <p>
      Versprochen: Wir nutzen sie nicht für Werbezwecke, geben sie nicht weiter
      oder machen sonst irgendein komisches Zeug mit ihr!
    </p>
  </n-form>
</template>
