export class doctorOrNurseRegisterOutput {
    status: string = "";
    message: string = "";
    data = new userDate();
}


class userDate {
    id: number = 0;
    userName: string = "";
    displayName: string = "";
    token: string = ""
}