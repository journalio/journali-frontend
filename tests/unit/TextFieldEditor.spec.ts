import { shallowMount } from '@vue/test-utils'
import TextFieldEditor from '@/components/editors/TextFieldEditor.vue'
import { TextField } from '@/models/entities'

describe('TextFieldEditor.vue', () => {
    it('renders with given value', () => {
        const value = { text: 'Lorem ipsum' }
        const wrapper = shallowMount(TextFieldEditor, {
            propsData: { value },
        })
        const element = wrapper.find('textarea').element as HTMLInputElement
        expect(element.value).toMatch(value.text)
    })
})
