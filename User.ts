class UserModel {
    email: string;
    name: string;
    state: string;
    userType: string;
    orgName: string;
    chapterId: string;
    password: string;
    rePassword: string;
    pin: string;
    chapterOption: string;
    studentId: string;

    constructor(email = "", name = "", state = "", userType = "", orgName = "", chapterId = "", password = "", rePassword = "", pin = "", chapterOption = "", studentId = "") {
        this.email = email;
        this.name = name;
        this.state = state;
        this.userType = userType;
        this.orgName = orgName;
        this.chapterId = chapterId;
        this.password = password;
        this.rePassword = rePassword;
        this.pin = pin;
        this.chapterOption = chapterOption;
        this.studentId = studentId;
    }

    // Add any methods you need for your model
    validatePassword(): boolean {
        return this.password === this.rePassword;
    }

    // Add other methods as required
}

export default UserModel;
