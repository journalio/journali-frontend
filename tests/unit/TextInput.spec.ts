import TextInput from '@/components/TextInput.vue'
import { shallowMount } from '@vue/test-utils'

describe('TextInput.vue', () => {
    it('renders with given value', () => {
        const value = 'ayy lmao'
        const wrapper = shallowMount(TextInput, {
            propsData: { value },
        })
        const element = wrapper.find('input').element as HTMLInputElement
        expect(element.value).toMatch(value)
    })
})
