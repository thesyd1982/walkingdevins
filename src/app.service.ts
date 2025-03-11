import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    private messages = [{ id: 12, title: "tata", content: "toto" }, { id: 22, title: "titi", content: "tutu" }]
    // create update read(retive) delete
    create(id: number, title: string, content: string) {

        const existingMessage = this.findOne(id)
        if (existingMessage) return null

        this.messages.push({ id, title, content })
        return this.findOne(id)
    }

    update(id: number) { return id }

    //read
    findAll() {
        return this.messages;
    }

    findOne(id: number) { return this.messages.find(e => e.id == id) }

    delete(id: number) { this.messages = this.messages.filter(e => e.id != id) }


}
