/* eslint-env jest */
import JournaliApp from '../app/JournaliApp'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const wrapper = shallowMount(JournaliApp, {
    localVue,
    router,
})

describe('JournaliApp.vue', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    test('contains app title', () => {
        expect(wrapper.text()).toContain('Journali')
    })
})
