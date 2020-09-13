import { Injectable } from '@nestjs/common';
import {Item} from './interfaces/item.interface';

@Injectable()
export class ItemsService {
    private readonly items: Item[] =[
        {
            id : "34484892093",
            name : "Item One",
            qty : 100,
            description : "This is Item One"
        },

        {
            id : "454554545454",
            name : "Item Two",
            qty : 210,
            description : "This is Item Two"
        }
    ];

    findAll(): Item[] {
        return this.items;
    }

    findOne(id : string): Item {
        return this.items.find(item => item.id === id);
    }
}
