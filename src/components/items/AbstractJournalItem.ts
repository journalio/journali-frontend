import { ItemType, Uuid } from '@/models'
import Item from '@/models/Item'
import { Prop, Vue } from 'vue-property-decorator'

export default class AbstractJournalItem<C = Item> extends Vue {
    @Prop(String) readonly id!: Uuid
    @Prop(Number) readonly item_type!: ItemType
    @Prop(String) readonly parent_id!: Uuid
    @Prop(Number) readonly parent_type!: ItemType | null
    @Prop(Date) readonly created_at!: Date
    @Prop(Date) readonly updated_at!: Date

    protected get childItems(): C[] {
        return this.$store.getters.getItemsByParent(this.id)
    }
}
