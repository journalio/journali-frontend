interface RandomPlaceholder {
    text: string
    icon: string
}

const items: RandomPlaceholder[] = [
    {
        text: '60% of the time, it works every time',
        icon: 'promise',
    },
    {
        text: 'Journali helps <strong>you</strong> be more productive!',
        icon: 'the-office',
    },
    {
        text: 'You can use due dates to keep track of deadlines',
        icon: 'due-dates',
    },
    {
        text:
            'Something wrong with the application? Contact us and we will look at it',
        icon: 'coffee-spit',
    },
    {
        text:
            'Did you know? The Journali api is written in <strong>rust</strong>',
        icon: 'api',
    },
    {
        text: 'Got an idea? Create a list to keep track of them',
        icon: 'idea',
    },
]

export const randomPlaceholder = (): RandomPlaceholder => {
    return items[Math.floor(Math.random() * items.length)]
}

export default items
