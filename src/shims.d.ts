// may need some polishing: https://vuejs.org/v2/guide/typescript.html
import HttpHelper from '@/lib/HttpHelper'

declare module 'vue/types/vue' {
    interface Vue {
        $http: HttpHelper
    }
}
