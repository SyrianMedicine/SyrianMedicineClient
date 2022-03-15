export class loginAdminOutput {
    status: string = "";
    message: string = "";
    data = new userDate();
}

class userDate {
    userName: string = "";
    email: number = 0;
    displayName: string = "";
    token: string = ""
}