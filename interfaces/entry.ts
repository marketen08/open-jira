

export interface Entry {
    _id: string;
    description: string;
    status: EntryStatus; // pending, in-progress, finished
    createdAt: Date;
    updatedAt: Date;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';