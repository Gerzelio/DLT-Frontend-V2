import { Model } from "@nozbe/watermelondb";
import { field, text, children } from "@nozbe/watermelondb/decorators";


export default class Locality extends Model {
    static table = "localities"

    static associations = {
        users: { type: 'has_many', foreignKey: 'locality_id' },
    }

    @text("name") name
    @text("description") description
    @field("status") status

    @children('users') users
}