export interface ILoginCredentials{
    login:string|null,
    password:string|null,
    qrToken:string|null
}

export interface IModalContext {
    //Modal title
    title: string,
    //Is Cancel button need
    noCancel: boolean,
    //text for Ok and Cancel
    buttonsText: string[],
    //callbacks for buttons
    handleOk: any,
    handleCancel: any,
    //content adding method for modal container should be designed
    childContent: any
}
