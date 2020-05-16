import AbstractHttpClient from '@/lib/http/AbstractHttpClient'
import Page from '@/models/Page'

export default class ItemsClient extends AbstractHttpClient {
    public fetchPages(): Promise<Page[]> {
        return Promise.resolve(
            ['Een pagina', 'Nog een pagina'].map((e) => ({
                title: e,
                id: e,
                item_type: 100,
            })),
        )
        // return this.get<Page[]>('/api/pages')
    }
}
