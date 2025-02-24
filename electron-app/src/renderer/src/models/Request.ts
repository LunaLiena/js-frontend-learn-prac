export interface Request {
    id: number;
    date: string;
    techType: string;
    model: string;
    problemDescription: string;
    clientName: string;
    phoneNumber: string;
    status: string;
    comments: string[];
    parts: string[];
}