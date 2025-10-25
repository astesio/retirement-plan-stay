export interface IUsecase<InputDto, OutputDto> {
  execute(input: InputDto): Promise<OutputDto>;
}
