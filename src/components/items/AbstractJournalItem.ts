import { Item } from '@/models/entities'
import { ItemType, Uuid } from '@/models/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AbstractJournalItem<C = Item> extends Vue implements Item {
    @Prop(String) readonly id!: Uuid
    @Prop(Number) readonly item_type!: ItemType
    @Prop(String) readonly parent_id!: Uuid
    @Prop(Number) readonly parent_type!: ItemType | null
    @Prop(Date) readonly created_at!: Date
    @Prop(Date) readonly updated_at!: Date
    @Prop(Number) readonly coord_x!: number
    @Prop(Number) readonly coord_y!: number
    @Prop(String) readonly owner_id!: Uuid
    @Prop(Date) readonly due_date!: Date | null

    protected get childItems(): C[] {
        return this.$store.getters.getItemsByParent(this.id, this.item_type)
    }
}
