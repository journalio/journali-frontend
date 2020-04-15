/* eslint-env jest */
import { createLocalVue, shallowMount } from '@vue/test-utils'
import IndexPage from '../../app/views/IndexPage'

const localVue = createLocalVue()

const wrapper = shallowMount(IndexPage, {
    localVue,
})

describe('IndexPage.vue', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test('contains app title', () => {
        expect(wrapper.text()).toContain('Journali')
    })
})
