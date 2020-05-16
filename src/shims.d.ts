// may need some polishing: https://vuejs.org/v2/guide/typescript.html
import AbstractHttpClient from '@/lib/http/AbstractHttpClient'

declare module 'vue/types/vue' {
    interface Vue {
        $http: AbstractHttpClient
    }
}
