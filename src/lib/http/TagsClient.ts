import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Tag, Common } from '@/models/entities'

export default class TagsClient extends AbstractHttpClient {
    async fetchAllTags(): Promise<Tag[]> {
        // return Promise.resolve([
        //     {
        //         id: "f55833a8-4fb2-4f1d-8495-6091863dad0d",
        //         name: 'WWWWWWWWWWWWWWWW',
        //         color: '#4287f5',
        //         items: [

        //         ],
        //     },
        //     {
        //         id: "b2faaecd-7395-4ef2-a08e-e86439f5519b",
        //         name: 'Boodschappen',
        //         color: '#eb4034',
        //         items: [

        //         ],
        //     },
        //     {
        //         id: "2600ead9-ffbf-4574-ac87-424269dbbae1",
        //         name: 'School',
        //         color: '#ae6dc9',
        //         items: [

        //         ],
        //     },
        //     {
        //         id: "bda3a709-87d8-4861-8f69-031de83e128b",
        //         name: 'memes',
        //         color: '#aff7ab',
        //         items: [

        //         ],
        //     },
        //     {
        //         id: "af8d9bd3-7ae1-41ac-a511-779265989806",
        //         name: 'vrienden',
        //         color: '#ff809b',
        //         items: [

        //         ],
        //     },
        //     {
        //         id: "1b8e5fe6-5a78-446b-9481-2151417c4128",
        //         name: 'IPSENH',
        //         color: '#e0d94f',
        //         items: [

        //         ],
        //     },
        //     {
        //         id: "03d9dd5b-71ca-4636-a4b2-2de12876c13e",
        //         name: 'Tabletop RPG',
        //         color: '#fc881c',
        //         items: [
        //         ],
        //     },
        // ])
        // Uncomment this when /api/tags is implemented
        return this.get<Tag[]>('/api/tags')
    }

    createTag(tag: Tag): Promise<Tag> {
        return this.post<Tag>('/api/tags', tag)
    }

    updateTag(tag: Tag): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}`, tag)
    }

    assignItems(tag: Tag, items: Array<Common>): Promise<Tag> {
        return this.patch<Tag>(`/api/tags/${tag.id}/items`, items)
    }

    deleteTag(tag: Tag): Promise<null> {
        return this.delete(`/api/tags/${tag.id}`)
    }
}
