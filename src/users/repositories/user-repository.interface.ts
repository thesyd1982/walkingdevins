export default interface ICRUD<T extends { id: string | number }> {
    create(item: T): Promise<T>;
    findOne(item: T): Promise<T>;
    findAll(): Promise<T[] | undefined>;
    update(item: T): Promise<T | undefined>;
    delete(id: string | number): Promise<T | undefined>;
}

