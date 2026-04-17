export class HttpApis {
    private static serverPort: number = 3000
    private static serverIp: string = `http://localhost:${this.serverPort}/`;
    public static loginApi: string = `${this.serverIp}/login/v1/api/`;
    public static userDetailsApi: string = `${this.serverIp}/user/me/v1/api/`
    public static categoriesApi: string = `${this.serverIp}/categories/v1/api/`
    public static productsApi: string = `${this.serverIp}/items/v1/api/`
}