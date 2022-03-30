export class DoctorInfo {
    id: number = 0;
    userName: string = "";
    email!:string;
    displayName: string = "";
    pictureUrl: string = "";
    location: string = "";
    homeNumber: string = "";
    phoneNumber: string = "";
    aboutMe: string = "";
    city: string = "";
    state!:string;
    gender!:string;
    specialization: string = "";
    workAtHome: boolean = false;
    startTimeWork: Date | any;
    endTimeWork: Date | any;
}

