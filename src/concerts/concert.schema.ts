import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
    @ApiProperty()
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    date: string;

    @Prop()
    concertVenue: string;

    @Prop()
    soloist: string;

    @Prop()
    conductor: string;

    @Prop()
    performer: string;

    @Prop()
    compositions: string;

    @Prop()
    note: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert)