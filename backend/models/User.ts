import {Database} from "../database/database"
class User {
    private id: number;
    private username: string;
    private email: string;
    private password: string;
    private profile: Profile;

    constructor(id: number, username: string, email: string, password: string, profile: Profile) {
        if (id)
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profile = profile
    }
    getId() {return this.id}
    getUsername() {return this.username}
    getEmail() {return this.email}
    getPassword() {return this.password}
    getProfile() {return this.profile}

    build() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            profile: this.profile.build()
        }

    }
}

class Profile {
    private displayname: string ;
    private avatar: string;
    private roles: { admin: boolean, parent: boolean, advisor: boolean, developer: boolean, chaperone: boolean };
    private events: number[];
    private lastLogin: Date;
    constructor(displayname: string, avatar: string, roles: string[], events: number[], lastLogin: Date, admin: boolean) {
        this.displayname = displayname;
        this.avatar = avatar;
        this.roles = { admin: false, parent: false, chaperone: false, advisor: false, developer: false };;
        this.events = events;
        this.lastLogin = lastLogin;

    }

    getDisplayname() {return this.displayname}
    getAvatar() {return this.avatar}
    getRoles() {return this.roles}
    getEvents() {return this.events}
    getLastLogin() {return this.lastLogin}

    setDisplayname(displayname: string) {this.displayname = displayname}
    setAvatar(avatar: string) {this.avatar = avatar}
    setEvents(events: number[]) {this.events = events}
    setLastLogin(lastLogin: Date) {this.lastLogin = lastLogin}
    //set roles
setAdmin(admin: boolean) {this.roles.admin = admin}
setParent(parent: boolean) {this.roles.parent = parent}
setAdvisor(advisor: boolean) {this.roles.advisor = advisor}
setDeveloper(developer: boolean) {this.roles.developer = developer}
setChaperone(chaperone: boolean) {this.roles.chaperone = chaperone}
    build() {
        return {
            displayname: this.displayname,
            avatar: this.avatar,
            roles: this.roles,
            events: this.events,
            lastLogin: this.lastLogin,
        }
    }
}
export {User, Profile};