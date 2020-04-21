import { action } from '@storybook/addon-actions'
import TestButton from '../app/components/TestButton'

export default {
    title: 'Test Button',
}

export const standard = () => ({
    components: {
        TestButton,
    },
    template: `
        <test-button @click="action">Hello world</test-button>
    `,
    methods: { action: action('clicked') },
})
