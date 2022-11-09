import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import TheGasCalculator from '../TheGasCalculator.vue'

describe('TheGasCalculator', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(TheGasCalculator)
    expect(wrapper.element).toMatchSnapshot()
  })
})
