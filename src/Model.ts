export interface Ijob {
    id: string;
    owner: string;
    callback: () => Promise<void>;
}

export interface Istate {
    name: string;
    position: number;
}
