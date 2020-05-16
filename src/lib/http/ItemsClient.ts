import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import { Uuid } from '@/models'
import Item from '@/models/Item'
import Page from '@/models/Page'

export default class ItemsClient extends AbstractHttpClient {
    public fetchPages(): Promise<Page[]> {
        return Promise.resolve([
            {
                id: '9ab51ba2-7faa-4c7a-b36f-ea051a441534',
                item_type: 100,
                title: 'test page please ignore',
            },
            {
                id: 'a6182029-f30f-43fb-bb2d-981df3150e94',
                item_type: 100,
                title: 'test page please ignorei2',
            },
        ])
        // Uncomment when endpoint is implemented
        // return this.get<Page[]>('/api/pages')
    }

    async fetchPage(pageId: Uuid): Promise<Item[]> {
        return Promise.resolve(
            [
                {
                    id: '0332e919-346a-41fa-afe8-b87a30a6d7e4',
                    item_type: 200,
                    parent_id: 'a6182029-f30f-43fb-bb2d-981df3150e94',
                    parent_type: 100,
                    created_at: new Date('2020-05-14 12:33:11.660025'),
                    updated_at: new Date('2020-05-14 12:33:44.250501'),
                },
            ].filter((e) => e.parent_id === pageId),
        )
        // Uncomment when endpoint is implemented
        // return this.get<Item[]>(`/api/items?page_id=${pageId}`)
    }
}
