export interface INew {
    title: string;
    link: string;
    from: string;
    date: Date;
    brief?: string;
    related?: string;
}

export interface ISite {
    from: string;
    url: string;
    fetch(): Promise<INew[]>;
}
