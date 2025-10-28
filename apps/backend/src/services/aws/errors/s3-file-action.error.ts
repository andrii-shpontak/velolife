export class S3FileActionError extends Error {
  constructor(
    readonly name: string,
    readonly message: string,
  ) {
    super(message);
  }
}
