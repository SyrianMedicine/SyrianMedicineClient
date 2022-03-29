export class UserRate {
    status: string | any;
    message: string | any;
    data = new Data();
}

export class Data {
    ratingData: Array<RatingData> = new Array<RatingData>();
    average = 0.0;
    total =0;
}

export class RatingData {
    starNumber: number = 0.0;
    count = 0;
}
