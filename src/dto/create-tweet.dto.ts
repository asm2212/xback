export class CreateTweetDto {
  readonly content!: string;
  readonly userId!: string; // Associate tweet with user
}