export class EditArticleDto {
    name: string;
    categoryId: number;
    excerpt: string;
    description: string;
    price: number;
    status: 'avaliable' | 'visible' | 'hidden';
    isPromoted: 0 | 1;
    features: {
        featureId: number,
        value: string,
    }[] | null;
}