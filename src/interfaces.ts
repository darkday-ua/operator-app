export interface ILoginCredentials {
    login: string | null,
    password: string | null,
    qrToken: string | null
}

export interface IModalContext {
    //Modal title
    title: string,
    //Is Cancel button need
    noCancel: boolean,
    //text for Ok and Cancel
    buttonsText: string[],
    //callbacks for buttons
    handlers: any,
    //content adding method for modal container should be designed
    childContent: any
}

export interface ICredentials { user: '', password: '', qrToken: '' }