export interface EntityFactory<T> {
    toJson(entity: T): any;
    fromJson(data: any): T;
    mapArrayFromJson(data: any[]): T[];
}  