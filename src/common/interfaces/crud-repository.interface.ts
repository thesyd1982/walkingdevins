export interface ICRUDRepository<T, CreateDto, UpdateDto, QueryParamsDto> {
    findAll(params: QueryParamsDto): Promise<T[]>
    findOne(id: string | number): Promise<T | null>
    create(dto: CreateDto): Promise<T>
    update(id: string | number, dto: UpdateDto): Promise<T>
    delete(id: string | number): Promise<void>
}

