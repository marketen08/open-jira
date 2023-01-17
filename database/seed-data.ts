interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData:SeedData = {
    entries: [
        {
            description: 'Pendiente: Pasdashd ahskdha kjdhakshdkash dkahskd haksdh kashdkahsdkjahs.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En Progreso: Esdjksjd ksjadlk ajlksdj alksjdlkajdlk.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Terminado: Ysadaksldj alksjd lkasjdlk asjlkd jalksdj laksjd lkasjdlk aj.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}