import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('specifications')
class Specification {
    @PrimaryColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Specification };
