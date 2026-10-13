export interface Ijob {
    id: string;
    callback: () => Promise<void>;
}

export interface Istate {
    name: string;
    position: number;
}
