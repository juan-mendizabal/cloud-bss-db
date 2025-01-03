declare module 'cloud-bss-db' {
    export function executeCloudBSSQuery(query: string): Promise<any>;
}