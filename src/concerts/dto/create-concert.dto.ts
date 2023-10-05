import {ApiProperty} from "@nestjs/swagger";

export class CreateConcertDto {
    @ApiProperty({example: '', description: ''})
    readonly title: string;
    @ApiProperty({example: '', description: ''})
    readonly date: string;
    @ApiProperty({example: '', description: ''})
    readonly concertVenue: string;
    @ApiProperty({example: '', description: ''})
    readonly soloist: string;
    @ApiProperty({example: '', description: ''})
    readonly conductor: string;
    @ApiProperty({example: '', description: ''})
    readonly performer: string;
    @ApiProperty({example: '', description: ''})
    readonly compositions: string;
    @ApiProperty({example: '', description: ''})
    readonly note: string;
}