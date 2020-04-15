/* eslint-env jest */
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import StoreExample from '../../app/components/StoreExample'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('StoreExample.vue', () => {
    let actions
    let getters
    let store

    beforeEach(() => {
        actions = {
            increment: jest.fn(),
        }
        getters = {
            count: () => 1337,
        }
        store = new Vuex.Store({
            actions,
            getters,
        })
    })

    it('calls store action "increment" when button is clicked', () => {
        const wrapper = shallowMount(StoreExample, { store, localVue })
        wrapper.find('button').trigger('click')
        expect(actions.increment).toHaveBeenCalled()
    })

    it('does not dispatch "increment" when button is not clicked', () => {
        shallowMount(StoreExample, { store, localVue })
        expect(actions.increment).not.toHaveBeenCalled()
    })

    it('renders clicks in span', () => {
        const wrapper = shallowMount(StoreExample, { store, localVue })
        const p = wrapper.find('span')
        expect(p.text()).toBe(getters.count().toString())
    })
})
