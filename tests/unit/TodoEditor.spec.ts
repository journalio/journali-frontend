import { mount } from '@vue/test-utils'
import TodoEditor from '@/components/editors/TodoEditor.vue'
import { Todo } from '@/models/entities'

describe('TodoEditor.vue', () => {
    it('renders with given value', () => {
        const value = { title: 'Lorem ipsum' }
        const wrapper = mount(TodoEditor, {
            propsData: { value },
        })
        const element = wrapper.find('input').element as HTMLInputElement
        expect(element.value).toMatch(value.title)
    })
})
