import { addDecorator } from '@storybook/vue'
import '../app/style.css'

const PaddingDecorator = () => ({
    template: `<div class="p-4"><story /></div>`,
})

addDecorator(PaddingDecorator)
